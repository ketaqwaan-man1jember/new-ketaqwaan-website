const express = require('express');
const { body, validationResult } = require('express-validator');
const { adminAuth } = require('../middleware/auth');

const router = express.Router();

// Simple in-memory storage for navbar (you can replace with database model)
let navbarData = {
  NavbarJudul: "SIE 1 KETAQWAAN",
  NavbarSekolah: "MAN 1 Jember",
  NavbarMenuMobile: "Menu Navigasi",
  NavbarHome: "Beranda",
  NavbarStruktur: "Struktur Organisasi",
  NavbarProgramKerja: "Program Kerja",
  NavbarKegiatan: "PHBI",
  NavbarEkskul: "Ekstrakurikuler",
  NavbarInformasi: "Informasi",
  NavbarSaran: "Kotak Saran",
  NavbarAdmin: "ADMIN",
  NavbarInstagramLink: "https://www.instagram.com",
  NavbarTiktokLink: "https://www.tiktok.com",
  NavbarCopyRight: "© 2025 SIE 1 KETAQWAAN MAN 1 JEMBER"
};

// @route   GET /api/navbar
// @desc    Get navbar data
// @access  Public
router.get('/', async (req, res) => {
  try {
    res.json({ navbar: navbarData });
  } catch (error) {
    console.error('Get navbar error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/navbar
// @desc    Update navbar
// @access  Private (Admin)
router.put('/', [
  adminAuth,
  body('NavbarJudul').trim().notEmpty(),
  body('NavbarSekolah').trim().notEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    navbarData = {
      ...navbarData,
      ...req.body
    };

    res.json({
      message: 'Navbar updated successfully',
      navbar: navbarData
    });
  } catch (error) {
    console.error('Update navbar error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;