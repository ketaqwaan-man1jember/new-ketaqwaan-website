const mongoose = require('mongoose');

const heroSectionSchema = new mongoose.Schema({
  HeroLogoSie1: {
    type: String,
    required: true
  },
  HeroDeskripsiLogoSie1: {
    type: String,
    required: true
  },
  HeroWelcomeText: {
    type: String,
    required: true
  },
  HeroPrimaryText: {
    type: String,
    required: true
  },
  HeroSecondaryText: {
    type: String,
    required: true
  },
  HeroDescription: {
    type: String,
    required: true
  },
  HeroInforSie1: [{
    HeroTotalProker: Number,
    HeroDeskripsiProker: String,
    HeroTotalEkskul: Number,
    HeroDeskripsiEkskul: String,
    HeroTotalAnggota: Number,
    HeroDeskripsiAnggota: String
  }],
  cta: [{
    text: String,
    link: String,
    icon: String,
    type: String
  }],
  slides: [{
    id: Number,
    image: String,
    title: String,
    description: String
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

module.exports = mongoose.model('HeroSection', heroSectionSchema);