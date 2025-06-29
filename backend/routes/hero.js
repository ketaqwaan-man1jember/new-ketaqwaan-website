const express = require('express');
const { body, validationResult } = require('express-validator');
const HeroSection = require('../models/HeroSection');
const { adminAuth } = require('../middleware/auth');
const { upload } = require('../config/cloudinary');

const router = express.Router();

// @route   GET /api/hero
// @desc    Get hero section data
// @access  Public
router.get('/', async (req, res) => {
  try {
    const heroData = await HeroSection.findOne({ isActive: true })
      .populate('updatedBy', 'name email');

    if (!heroData) {
      return res.status(404).json({ message: 'Hero section data not found' });
    }

    res.json({ heroSection: heroData });
  } catch (error) {
    console.error('Get hero error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/hero
// @desc    Create or update hero section
// @access  Private (Admin)
router.post('/', [
  adminAuth,
  body('HeroWelcomeText').trim().notEmpty(),
  body('HeroPrimaryText').trim().notEmpty(),
  body('HeroSecondaryText').trim().notEmpty(),
  body('HeroDescription').trim().notEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Deactivate existing hero section
    await HeroSection.updateMany({}, { isActive: false });

    // Create new hero section
    const heroData = new HeroSection({
      ...req.body,
      updatedBy: req.user._id,
      isActive: true
    });

    await heroData.save();
    await heroData.populate('updatedBy', 'name email');

    res.status(201).json({
      message: 'Hero section created successfully',
      heroSection: heroData
    });
  } catch (error) {
    console.error('Create hero error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/hero/:id
// @desc    Update hero section
// @access  Private (Admin)
router.put('/:id', [
  adminAuth,
  body('HeroWelcomeText').trim().notEmpty(),
  body('HeroPrimaryText').trim().notEmpty(),
  body('HeroSecondaryText').trim().notEmpty(),
  body('HeroDescription').trim().notEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const heroData = await HeroSection.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        updatedBy: req.user._id
      },
      { new: true }
    ).populate('updatedBy', 'name email');

    if (!heroData) {
      return res.status(404).json({ message: 'Hero section not found' });
    }

    res.json({
      message: 'Hero section updated successfully',
      heroSection: heroData
    });
  } catch (error) {
    console.error('Update hero error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/hero/upload-image
// @desc    Upload image for hero section
// @access  Private (Admin)
router.post('/upload-image', adminAuth, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    res.json({
      message: 'Image uploaded successfully',
      imageUrl: req.file.path,
      publicId: req.file.filename
    });
  } catch (error) {
    console.error('Upload image error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;