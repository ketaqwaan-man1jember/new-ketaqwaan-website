const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const createDefaultAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ketaqwaan');
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ 
      email: process.env.DEFAULT_ADMIN_EMAIL || 'admin@ketaqwaan.com' 
    });

    if (existingAdmin) {
      console.log('Default admin already exists');
      process.exit(0);
    }

    // Create default admin
    const defaultAdmin = new User({
      email: process.env.DEFAULT_ADMIN_EMAIL || 'admin@ketaqwaan.com',
      password: process.env.DEFAULT_ADMIN_PASSWORD || 'admin123',
      name: 'Super Administrator',
      role: 'super_admin'
    });

    await defaultAdmin.save();
    console.log('Default admin created successfully');
    console.log('Email:', defaultAdmin.email);
    console.log('Password:', process.env.DEFAULT_ADMIN_PASSWORD || 'admin123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating default admin:', error);
    process.exit(1);
  }
};

createDefaultAdmin();