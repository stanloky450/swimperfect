const express = require('express');
const { body, validationResult } = require('express-validator');
const Registration = require('../models/Registration');
const Child = require('../models/Child');
const User = require('../models/User');
const Settings = require('../models/Settings');
const Referral = require('../models/Referral');
const auth = require('../middleware/auth');
const { sendConfirmationEmail } = require('../utils/emailService');

const router = express.Router();

// Create new registration
router.post('/', [
  body('parentInfo.name').notEmpty().trim(),
  body('parentInfo.email').isEmail().normalizeEmail(),
  body('parentInfo.phone').notEmpty().trim(),
  body('children').isArray({ min: 1, max: 5 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { parentInfo, children, referralCode, transactionId, paymentStatus = 'completed' } = req.body;

    // Create or find parent user
    let parent = await User.findOne({ email: parentInfo.email });
    if (!parent) {
      parent = new User({
        name: parentInfo.name,
        email: parentInfo.email,
        phone: parentInfo.phone,
        password: 'temp_password_' + Date.now(), // Temporary password
        role: 'user'
      });
      await parent.save();
    }

    // Create children records
    const childIds = [];
    for (const childData of children) {
      const child = new Child({
        firstName: childData.firstName,
        lastName: childData.lastName,
        dateOfBirth: new Date(childData.dateOfBirth),
        medicalConditions: childData.medicalConditions || '',
        allergies: childData.allergies || '',
        specialNotes: childData.specialNotes || '',
        activities: {
          sports: childData.sportsActivity,
          mind: childData.mindActivity,
          creative: childData.creativeActivity
        }
      });
      await child.save();
      childIds.push(child._id);
    }

    // Calculate pricing
    const settings = await Settings.findOne() || new Settings();
    const basePrice = settings.basePrice;
    const childCount = children.length;
    const totalAmount = basePrice * childCount;
    
    // Apply family discount
    const familyDiscountRate = settings.discountRules.get(childCount.toString()) || 0;
    const familyDiscountAmount = totalAmount * (familyDiscountRate / 100);
    
    // Apply referral discount if applicable
    let referralDiscountAmount = 0;
    let referral = null;
    if (referralCode) {
      referral = await Referral.findOne({ code: referralCode.toUpperCase(), isActive: true });
      if (referral && referral.discountPercentage > 0) {
        referralDiscountAmount = totalAmount * (referral.discountPercentage / 100);
      }
    }
    
    // Calculate final amount (apply the better discount)
    const bestDiscountAmount = Math.max(familyDiscountAmount, referralDiscountAmount);
    const finalAmount = totalAmount - bestDiscountAmount;

    // Create registration
    const registration = new Registration({
      parentId: parent._id,
      parentInfo: {
        name: parentInfo.name,
        email: parentInfo.email,
        phone: parentInfo.phone,
        emergencyContact: parentInfo.emergencyContact,
        address: parentInfo.address,
        needsPickup: parentInfo.needsPickup === 'yes'
      },
      children: childIds,
      totalAmount: finalAmount,
      discountApplied: bestDiscountAmount,
      paymentStatus: paymentStatus,
      transactionId: transactionId || `TEMP_${Date.now()}`,
      referralCode: referralCode || null
    });

    await registration.save();

    // Update referral usage only if payment is completed
    if (referral && paymentStatus === 'completed') {
      referral.usedBy.push({
        registrationId: registration._id,
        usedAt: new Date(),
        parentName: parentInfo.name,
        totalAmount: finalAmount
      });
      await referral.save();
    }

    // Send confirmation email only if payment is completed
    if (paymentStatus === 'completed') {
      try {
        await sendConfirmationEmail(registration, children);
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // Don't fail the registration if email fails
      }
    }

    res.status(201).json({
      message: paymentStatus === 'completed' ? 'Registration successful' : 'Registration saved with pending payment',
      registrationId: registration._id,
      paymentStatus: paymentStatus,
      finalAmount: finalAmount,
      discountApplied: bestDiscountAmount
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all registrations (admin only)
router.get('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const registrations = await Registration.find()
      .populate('children')
      .populate('parentId', 'name email phone')
      .sort({ createdAt: -1 });

    res.json(registrations);
  } catch (error) {
    console.error('Get registrations error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get registration by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id)
      .populate('children')
      .populate('parentId', 'name email phone');

    if (!registration) {
      return res.status(404).json({ message: 'Registration not found' });
    }

    // Users can only view their own registrations
    if (req.user.role !== 'admin' && registration.parentId._id.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(registration);
  } catch (error) {
    console.error('Get registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update registration (admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const registration = await Registration.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('children').populate('parentId', 'name email phone');

    if (!registration) {
      return res.status(404).json({ message: 'Registration not found' });
    }

    res.json(registration);
  } catch (error) {
    console.error('Update registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update payment status (for handling payment updates)
router.patch('/:id/payment', async (req, res) => {
  try {
    const { paymentStatus, transactionId } = req.body;
    
    const registration = await Registration.findById(req.params.id);
    if (!registration) {
      return res.status(404).json({ message: 'Registration not found' });
    }

    registration.paymentStatus = paymentStatus;
    if (transactionId) {
      registration.transactionId = transactionId;
    }

    await registration.save();

    // If payment is now completed, update referral usage and send email
    if (paymentStatus === 'completed') {
      // Update referral usage
      if (registration.referralCode) {
        const referral = await Referral.findOne({ 
          code: registration.referralCode.toUpperCase(), 
          isActive: true 
        });
        
        if (referral) {
          // Check if this registration is already in the usedBy array
          const alreadyUsed = referral.usedBy.some(
            usage => usage.registrationId.toString() === registration._id.toString()
          );
          
          if (!alreadyUsed) {
            referral.usedBy.push({
              registrationId: registration._id,
              usedAt: new Date(),
              parentName: registration.parentInfo.name,
              totalAmount: registration.totalAmount
            });
            await referral.save();
          }
        }
      }

      // Send confirmation email
      try {
        const children = await Child.find({ _id: { $in: registration.children } });
        await sendConfirmationEmail(registration, children);
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
      }
    }

    res.json({
      message: 'Payment status updated successfully',
      registration
    });

  } catch (error) {
    console.error('Update payment status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete registration (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const registration = await Registration.findById(req.params.id);
    if (!registration) {
      return res.status(404).json({ message: 'Registration not found' });
    }

    // Delete associated children
    await Child.deleteMany({ _id: { $in: registration.children } });
    
    // Delete registration
    await Registration.findByIdAndDelete(req.params.id);

    res.json({ message: 'Registration deleted successfully' });
  } catch (error) {
    console.error('Delete registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;