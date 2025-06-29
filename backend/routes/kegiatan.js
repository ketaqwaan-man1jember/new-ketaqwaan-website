const express = require('express');
const { body, validationResult } = require('express-validator');
const Kegiatan = require('../models/Kegiatan');
const { adminAuth } = require('../middleware/auth');
const { upload } = require('../config/cloudinary');

const router = express.Router();

// @route   GET /api/kegiatan
// @desc    Get kegiatan data
// @access  Public
router.get('/', async (req, res) => {
  try {
    const kegiatanData = await Kegiatan.findOne({ isActive: true })
      .populate('updatedBy', 'name email');

    if (!kegiatanData) {
      return res.status(404).json({ message: 'Kegiatan data not found' });
    }

    res.json({ kegiatan: kegiatanData });
  } catch (error) {
    console.error('Get kegiatan error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/kegiatan
// @desc    Create or update kegiatan
// @access  Private (Admin)
router.post('/', [
  adminAuth,
  body('KegiatanJudul').trim().notEmpty(),
  body('KegiatanDeskripsi').trim().notEmpty(),
  body('KegiatanSlide').isArray().withMessage('KegiatanSlide must be an array')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Deactivate existing kegiatan
    await Kegiatan.updateMany({}, { isActive: false });

    // Create new kegiatan
    const kegiatanData = new Kegiatan({
      ...req.body,
      updatedBy: req.user._id,
      isActive: true
    });

    await kegiatanData.save();
    await kegiatanData.populate('updatedBy', 'name email');

    res.status(201).json({
      message: 'Kegiatan created successfully',
      kegiatan: kegiatanData
    });
  } catch (error) {
    console.error('Create kegiatan error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/kegiatan/:id
// @desc    Update kegiatan
// @access  Private (Admin)
router.put('/:id', [
  adminAuth,
  body('KegiatanJudul').trim().notEmpty(),
  body('KegiatanDeskripsi').trim().notEmpty(),
  body('KegiatanSlide').isArray().withMessage('KegiatanSlide must be an array')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const kegiatanData = await Kegiatan.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        updatedBy: req.user._id
      },
      { new: true }
    ).populate('updatedBy', 'name email');

    if (!kegiatanData) {
      return res.status(404).json({ message: 'Kegiatan not found' });
    }

    res.json({
      message: 'Kegiatan updated successfully',
      kegiatan: kegiatanData
    });
  } catch (error) {
    console.error('Update kegiatan error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/kegiatan/upload-image
// @desc    Upload image for kegiatan
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