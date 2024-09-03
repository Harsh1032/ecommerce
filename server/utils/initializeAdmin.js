const Admin = require('../models/adminModel');
const bcrypt = require('bcryptjs');

const initializeAdmin = async () => {
    const adminPassword = process.env.ADMIN_PASSWORD;
    try {
        console.log('Running admin initialization logic...');
        const adminExists = await Admin.findOne({ username: 'admin' });
    
        if (!adminExists) {
          console.log('No admin found, creating a new admin account...');
          
          // Hash the password before saving
          const hashedPassword = await bcrypt.hash(adminPassword, 10);
          
          const admin = new Admin({
            username: 'admin',
            password: hashedPassword, // Save the hashed password
          });
    
          await admin.save();
          console.log('Admin account created');
        } else {
          console.log('Admin account already exists');
        }
      } catch (error) {
        console.error('Error initializing admin account:', error);
      }
    };
  
  module.exports = initializeAdmin;