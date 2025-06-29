const mongoose = require('mongoose');

const programKerjaSchema = new mongoose.Schema({
  ProgramKerjaJudul: {
    type: String,
    required: true
  },
  ProgramKerjaDeskripsi: {
    type: String,
    required: true
  },
  programs: [{
    icon: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['Selesai', 'Sedang-Berlangsung', 'Direncanakan'],
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

module.exports = mongoose.model('ProgramKerja', programKerjaSchema);