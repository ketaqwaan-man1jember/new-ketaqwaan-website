const mongoose = require('mongoose');

const structureSectionSchema = new mongoose.Schema({
  Judul: {
    type: String,
    required: true
  },
  JudulDeskripsi: {
    type: String,
    required: true
  },
  JudulPengurus: {
    type: String,
    required: true
  },
  TahunKepengurusan: {
    type: String,
    required: true
  },
  BaganStukturKorbid: {
    type: String,
    required: true
  },
  BaganStukturKetua: {
    type: String,
    required: true
  },
  BaganStukturSekretaris: {
    type: String,
    required: true
  },
  BaganStukturBendahara: {
    type: String,
    required: true
  },
  members: [{
    type: String,
    required: true
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

module.exports = mongoose.model('StructureSection', structureSectionSchema);