const express = require('express');
const { body, validationResult } = require('express-validator');
const Ekskul = require('../models/Ekskul');
const { adminAuth } = require('../middleware/auth');
const { upload } = require('../config/cloudinary');

const router = express.Router();

// @route   GET /api/ekskul
// @desc    Get ekskul data
// @access  Public
router.get('/', async (req, res) => {
  try {
    const ekskulData = await Ekskul.findOne({ isActive: true })
      .populate('updatedBy', 'name email');

    if (!ekskulData) {
      return res.status(404).json({ message: 'Ekskul data not found' });
    }

    res.json({ ekskul: ekskulData });
  } catch (error) {
    console.error('Get ekskul error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/ekskul
// @desc    Create or update ekskul
// @access  Private (Admin)
router.post('/', [
  adminAuth,
  body('EkskulJudul').trim().notEmpty(),
  body('EkskulDeskripsi').trim().notEmpty(),
  body('EkskulSlide').isArray().withMessage('EkskulSlide must be an array')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Deactivate existing ekskul
    await Ekskul.updateMany({}, { isActive: false });

    // Create new ekskul
    const ekskulData = new Ekskul({
      ...req.body,
      updatedBy: req.user._id,
      isActive: true
    });

    await ekskulData.save();
    await ekskulData.populate('updatedBy', 'name email');

    res.status(201).json({
      message: 'Ekskul created successfully',
      ekskul: ekskulData
    });
  } catch (error) {
    console.error('Create ekskul error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/ekskul/:id
// @desc    Update ekskul
// @access  Private (Admin)
router.put('/:id', [
  adminAuth,
  body('EkskulJudul').trim().notEmpty(),
  body('EkskulDeskripsi').trim().notEmpty(),
  body('EkskulSlide').isArray().withMessage('EkskulSlide must be an array')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const ekskulData = await Ekskul.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        updatedBy: req.user._id
      },
      { new: true }
    ).populate('updatedBy', 'name email');

    if (!ekskulData) {
      return res.status(404).json({ message: 'Ekskul not found' });
    }

    res.json({
      message: 'Ekskul updated successfully',
      ekskul: ekskulData
    });
  } catch (error) {
    console.error('Update ekskul error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/ekskul/upload-image
// @desc    Upload image for ekskul
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