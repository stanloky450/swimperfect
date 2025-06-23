const mongoose = require('mongoose');

const childSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  medicalConditions: {
    type: String,
    trim: true,
    default: ''
  },
  allergies: {
    type: String,
    trim: true,
    default: ''
  },
  specialNotes: {
    type: String,
    trim: true,
    default: ''
  },
  activities: {
    sports: {
      type: String,
      enum: ['football', 'basketball'],
      required: true
    },
    mind: {
      type: String,
      enum: ['chess', 'scrabble'],
      required: true
    },
    creative: {
      type: String,
      enum: ['ballet', 'martial-arts'],
      required: true
    },
    // Swimming and coding are automatically included
    included: {
      type: [String],
      default: ['swimming', 'coding']
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Child', childSchema);