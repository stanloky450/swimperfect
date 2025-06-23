const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  basePrice: {
    type: Number,
    required: true,
    default: 150000
  },
  discountRules: {
    type: Map,
    of: Number,
    default: {
      '2': 5,
      '3': 10,
      '4': 15,
      '5': 20
    }
  },
  campInfo: {
    startDate: Date,
    endDate: Date,
    maxCapacity: Number,
    currentEnrollment: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Settings', settingsSchema);