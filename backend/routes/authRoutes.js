const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const JWT_SECRET = '3adf2bb9d8bf3362d03b24c8b20785b77b368500d6bf990825654bb6781ebf0c';

// ================= SIGNUP =================
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        msg: 'User already exists'
      });
    }

    // Create user (password will be hashed in model)
    const user = new User({ name, email, password });
    await user.save();

    return res.status(201).json({
      success: true,
      msg: 'User registered successfully'
    });

  } catch (err) {
  console.log("Signup Error:", err.message);
  return res.status(500).json({
    success: false,
    msg: err.message
  });
}
});


// ================= LOGIN =================
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        msg: 'Invalid email'
      });
    }

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        msg: 'Invalid password'
      });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.json({
      success: true,
      msg: 'Login successful',
      token
    });

  } catch (err) {
    console.log("Login Error:", err);
    return res.status(500).json({
      success: false,
      msg: 'Server error during login'
    });
  }
});

// ================= LOGOUT =================
router.post('/logout', (req, res) => {
  try {
    return res.json({
      success: true,
      msg: "Logout successful"
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Server error during logout"
    });
  }
});
module.exports = router;