const express = require('express');
const { body, validationResult } = require('express-validator');
const { adminAuth } = require('../middleware/auth');

const router = express.Router();

// Simple in-memory storage for informasi (you can replace with database model)
let informasiData = {
  InformasiJudul: "INFORMASI",
  InformasiDeskripsi: "Pengumuman tentang siapa saja yang lolos menjadi anggota sie 1 ketaqwaan MAN 1 Jember.",
  InfomasiLink: "https://lookerstudio.google.com/reporting/dcf3ad5b-7817-4c57-b6ed-3bf6e96e6d96"
};

// @route   GET /api/informasi
// @desc    Get informasi data
// @access  Public
router.get('/', async (req, res) => {
  try {
    res.json({ informasi: informasiData });
  } catch (error) {
    console.error('Get informasi error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/informasi
// @desc    Update informasi
// @access  Private (Admin)
router.put('/', [
  adminAuth,
  body('InformasiJudul').trim().notEmpty(),
  body('InformasiDeskripsi').trim().notEmpty(),
  body('InfomasiLink').isURL()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    informasiData = {
      ...informasiData,
      ...req.body
    };

    res.json({
      message: 'Informasi updated successfully',
      informasi: informasiData
    });
  } catch (error) {
    console.error('Update informasi error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;