const express = require('express');
const { body, validationResult } = require('express-validator');
const StructureSection = require('../models/StructureSection');
const { adminAuth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/struktur
// @desc    Get structure section data
// @access  Public
router.get('/', async (req, res) => {
  try {
    const strukturData = await StructureSection.findOne({ isActive: true })
      .populate('updatedBy', 'name email');

    if (!strukturData) {
      return res.status(404).json({ message: 'Structure section data not found' });
    }

    res.json({ struktur: strukturData });
  } catch (error) {
    console.error('Get struktur error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/struktur
// @desc    Create or update structure section
// @access  Private (Admin)
router.post('/', [
  adminAuth,
  body('Judul').trim().notEmpty(),
  body('JudulDeskripsi').trim().notEmpty(),
  body('TahunKepengurusan').trim().notEmpty(),
  body('members').isArray().withMessage('Members must be an array')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Deactivate existing structure section
    await StructureSection.updateMany({}, { isActive: false });

    // Create new structure section
    const strukturData = new StructureSection({
      ...req.body,
      updatedBy: req.user._id,
      isActive: true
    });

    await strukturData.save();
    await strukturData.populate('updatedBy', 'name email');

    res.status(201).json({
      message: 'Structure section created successfully',
      struktur: strukturData
    });
  } catch (error) {
    console.error('Create struktur error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/struktur/:id
// @desc    Update structure section
// @access  Private (Admin)
router.put('/:id', [
  adminAuth,
  body('Judul').trim().notEmpty(),
  body('JudulDeskripsi').trim().notEmpty(),
  body('TahunKepengurusan').trim().notEmpty(),
  body('members').isArray().withMessage('Members must be an array')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const strukturData = await StructureSection.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        updatedBy: req.user._id
      },
      { new: true }
    ).populate('updatedBy', 'name email');

    if (!strukturData) {
      return res.status(404).json({ message: 'Structure section not found' });
    }

    res.json({
      message: 'Structure section updated successfully',
      struktur: strukturData
    });
  } catch (error) {
    console.error('Update struktur error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;