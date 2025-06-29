const mongoose = require('mongoose');

const ekskulSchema = new mongoose.Schema({
  EkskulJudul: {
    type: String,
    required: true
  },
  EkskulDeskripsi: {
    type: String,
    required: true
  },
  EkskulSlide: [{
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    schedule: {
      day: {
        type: String,
        required: true
      },
      time: {
        type: String,
        required: true
      }
    }
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Ekskul', ekskulSchema);