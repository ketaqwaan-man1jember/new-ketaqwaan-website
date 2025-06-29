const express = require('express');
const { body, validationResult } = require('express-validator');
const { adminAuth } = require('../middleware/auth');

const router = express.Router();

// Simple in-memory storage for footer (you can replace with database model)
let footerData = {
  FooterDeskripsi: "Sie 1 Ketaqwaan adalah organisasi yang berada di lingkungan MAN 1 JEMBER.",
  FooterLinkInstagram: "/page-html/page-comingsoon.html",
  FooterLinkTiktok: "/page-html/page-comingsoon.html",
  FooterAlamatJalan: "Jl. Imam Bonjol No.50",
  FooterAlamatKecamatan: "Kaliwates Kidul, Kaliwates,",
  FooterAlamatKota: "Kec. Kaliwates, Kabupaten Jember,",
  FooterAlamatProvinsi: "Jawa Timur 68131.",
  FooterNarahubung: "Jika ada eror hubungi Admin yaaa 🤩"
};

// @route   GET /api/footer
// @desc    Get footer data
// @access  Public
router.get('/', async (req, res) => {
  try {
    res.json({ footer: footerData });
  } catch (error) {
    console.error('Get footer error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/footer
// @desc    Update footer
// @access  Private (Admin)
router.put('/', [
  adminAuth,
  body('FooterDeskripsi').trim().notEmpty(),
  body('FooterAlamatJalan').trim().notEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    footerData = {
      ...footerData,
      ...req.body
    };

    res.json({
      message: 'Footer updated successfully',
      footer: footerData
    });
  } catch (error) {
    console.error('Update footer error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;