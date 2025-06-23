const express = require('express');
const { body, validationResult } = require('express-validator');
const Referral = require('../models/Referral');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all referrals (admin only)
router.get('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const referrals = await Referral.find()
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });

    // Transform the data to include virtual fields and ensure proper structure
    const transformedReferrals = referrals.map(referral => ({
      _id: referral._id,
      code: referral.code,
      discountPercentage: referral.discountPercentage || 0,
      usageCount: referral.usedBy.length,
      totalRevenue: referral.usedBy.reduce((sum, usage) => sum + (usage.totalAmount || 0), 0),
      usedBy: referral.usedBy.map(usage => ({
        registrationId: {
          _id: usage.registrationId,
          parentInfo: {
            name: usage.parentName
          },
          totalAmount: usage.totalAmount
        },
        usedAt: usage.usedAt
      })),
      isActive: referral.isActive,
      createdBy: referral.createdBy,
      createdAt: referral.createdAt,
      updatedAt: referral.updatedAt
    }));

    res.json(transformedReferrals);
  } catch (error) {
    console.error('Get referrals error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get public referral stats (no auth required)
router.get('/public/:code', async (req, res) => {
  try {
    const referral = await Referral.findOne({ 
      code: req.params.code.toUpperCase(),
      isActive: true 
    });

    if (!referral) {
      return res.status(404).json({ message: 'Referral code not found' });
    }

    // Return public stats without sensitive information
    const publicStats = {
      code: referral.code,
      discountPercentage: referral.discountPercentage || 0,
      usageCount: referral.usedBy.length,
      totalRevenue: referral.usedBy.reduce((sum, usage) => sum + (usage.totalAmount || 0), 0),
      recentUsage: referral.usedBy
        .sort((a, b) => new Date(b.usedAt) - new Date(a.usedAt))
        .slice(0, 10)
        .map(usage => ({
          parentName: usage.parentName,
          amount: usage.totalAmount,
          usedAt: usage.usedAt
        }))
    };

    res.json(publicStats);
  } catch (error) {
    console.error('Get public referral stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create referral code (admin only)
router.post('/', auth, [
  body('code').notEmpty().trim().isLength({ min: 3, max: 20 }),
  body('discountPercentage').optional().isNumeric().isFloat({ min: 0, max: 100 })
], async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { code, discountPercentage = 0 } = req.body;

    // Check if code already exists
    const existingReferral = await Referral.findOne({ code: code.toUpperCase() });
    if (existingReferral) {
      return res.status(400).json({ message: 'Referral code already exists' });
    }

    const referral = new Referral({
      code: code.toUpperCase(),
      discountPercentage: discountPercentage,
      createdBy: req.user.userId
    });

    await referral.save();
    await referral.populate('createdBy', 'name email');

    // Return with proper structure
    const transformedReferral = {
      _id: referral._id,
      code: referral.code,
      discountPercentage: referral.discountPercentage || 0,
      usageCount: 0,
      totalRevenue: 0,
      usedBy: [],
      isActive: referral.isActive,
      createdBy: referral.createdBy,
      createdAt: referral.createdAt,
      updatedAt: referral.updatedAt
    };

    res.status(201).json(transformedReferral);
  } catch (error) {
    console.error('Create referral error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Validate referral code
router.get('/validate/:code', async (req, res) => {
  try {
    const referral = await Referral.findOne({ 
      code: req.params.code.toUpperCase(),
      isActive: true 
    });

    if (!referral) {
      return res.status(404).json({ message: 'Invalid referral code' });
    }

    res.json({ 
      valid: true, 
      code: referral.code,
      discountPercentage: referral.discountPercentage || 0,
      usageCount: referral.usedBy.length
    });
  } catch (error) {
    console.error('Validate referral error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update referral code (admin only)
router.put('/:id', auth, [
  body('discountPercentage').optional().isNumeric().isFloat({ min: 0, max: 100 })
], async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const referral = await Referral.findByIdAndUpdate(
      req.params.id,
      { discountPercentage: req.body.discountPercentage },
      { new: true, runValidators: true }
    ).populate('createdBy', 'name email');

    if (!referral) {
      return res.status(404).json({ message: 'Referral not found' });
    }

    res.json(referral);
  } catch (error) {
    console.error('Update referral error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete referral code (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const referral = await Referral.findByIdAndDelete(req.params.id);
    if (!referral) {
      return res.status(404).json({ message: 'Referral not found' });
    }

    res.json({ message: 'Referral deleted successfully' });
  } catch (error) {
    console.error('Delete referral error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;