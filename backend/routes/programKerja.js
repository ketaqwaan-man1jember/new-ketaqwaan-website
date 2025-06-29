const express = require('express');
const { body, validationResult } = require('express-validator');
const ProgramKerja = require('../models/ProgramKerja');
const { adminAuth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/program-kerja
// @desc    Get program kerja data
// @access  Public
router.get('/', async (req, res) => {
  try {
    const programKerjaData = await ProgramKerja.findOne({ isActive: true })
      .populate('updatedBy', 'name email');

    if (!programKerjaData) {
      return res.status(404).json({ message: 'Program kerja data not found' });
    }

    res.json({ programKerja: programKerjaData });
  } catch (error) {
    console.error('Get program kerja error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/program-kerja
// @desc    Create or update program kerja
// @access  Private (Admin)
router.post('/', [
  adminAuth,
  body('ProgramKerjaJudul').trim().notEmpty(),
  body('ProgramKerjaDeskripsi').trim().notEmpty(),
  body('programs').isArray().withMessage('Programs must be an array')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Deactivate existing program kerja
    await ProgramKerja.updateMany({}, { isActive: false });

    // Create new program kerja
    const programKerjaData = new ProgramKerja({
      ...req.body,
      updatedBy: req.user._id,
      isActive: true
    });

    await programKerjaData.save();
    await programKerjaData.populate('updatedBy', 'name email');

    res.status(201).json({
      message: 'Program kerja created successfully',
      programKerja: programKerjaData
    });
  } catch (error) {
    console.error('Create program kerja error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/program-kerja/:id
// @desc    Update program kerja
// @access  Private (Admin)
router.put('/:id', [
  adminAuth,
  body('ProgramKerjaJudul').trim().notEmpty(),
  body('ProgramKerjaDeskripsi').trim().notEmpty(),
  body('programs').isArray().withMessage('Programs must be an array')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const programKerjaData = await ProgramKerja.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        updatedBy: req.user._id
      },
      { new: true }
    ).populate('updatedBy', 'name email');

    if (!programKerjaData) {
      return res.status(404).json({ message: 'Program kerja not found' });
    }

    res.json({
      message: 'Program kerja updated successfully',
      programKerja: programKerjaData
    });
  } catch (error) {
    console.error('Update program kerja error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;