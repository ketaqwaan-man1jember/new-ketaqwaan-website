const mongoose = require('mongoose');

const kegiatanSchema = new mongoose.Schema({
  KegiatanJudul: {
    type: String,
    required: true
  },
  KegiatanDeskripsi: {
    type: String,
    required: true
  },
  KegiatanSlide: [{
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
    date: {
      type: String,
      required: true
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

module.exports = mongoose.model('Kegiatan', kegiatanSchema);