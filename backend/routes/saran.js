const express = require('express');
const { body, validationResult } = require('express-validator');
const { adminAuth } = require('../middleware/auth');

const router = express.Router();

// Simple in-memory storage for saran (you can replace with database model)
let saranData = {
  SaranJudul: "Kotak Saran",
  SaranDeskripsi: "Berikan semua kritik, saran, dan apresiasi anda kepada kami😊",
  SaranSubDeskripsi: "Tenang semua masukan yang anda berikan akan bersifat anonim😶‍🌫️ jadi jangan ragu untuk bersuara yaaa🤩",
  SaranLink: "https://kotaksaran-ketaqwaanman1jember.vercel.app/"
};

// @route   GET /api/saran
// @desc    Get saran data
// @access  Public
router.get('/', async (req, res) => {
  try {
    res.json({ saran: saranData });
  } catch (error) {
    console.error('Get saran error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/saran
// @desc    Update saran
// @access  Private (Admin)
router.put('/', [
  adminAuth,
  body('SaranJudul').trim().notEmpty(),
  body('SaranDeskripsi').trim().notEmpty(),
  body('SaranSubDeskripsi').trim().notEmpty(),
  body('SaranLink').isURL()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    saranData = {
      ...saranData,
      ...req.body
    };

    res.json({
      message: 'Saran updated successfully',
      saran: saranData
    });
  } catch (error) {
    console.error('Update saran error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;