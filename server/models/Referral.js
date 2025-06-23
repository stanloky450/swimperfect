const mongoose = require('mongoose');

const referralSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true
  },
  discountPercentage: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  usedBy: [{
    registrationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Registration'
    },
    usedAt: {
      type: Date,
      default: Date.now
    },
    parentName: {
      type: String,
      required: true
    },
    totalAmount: {
      type: Number,
      required: true
    }
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for usage count
referralSchema.virtual('usageCount').get(function() {
  return this.usedBy ? this.usedBy.length : 0;
});

// Virtual for total revenue generated
referralSchema.virtual('totalRevenue').get(function() {
  return this.usedBy ? this.usedBy.reduce((sum, usage) => sum + (usage.totalAmount || 0), 0) : 0;
});

// Ensure virtual fields are included when converting to JSON
referralSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
    ret.usageCount = doc.usedBy ? doc.usedBy.length : 0;
    ret.totalRevenue = doc.usedBy ? doc.usedBy.reduce((sum, usage) => sum + (usage.totalAmount || 0), 0) : 0;
    return ret;
  }
});

module.exports = mongoose.model('Referral', referralSchema);