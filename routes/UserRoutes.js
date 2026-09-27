//DEPENDANCIES
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

//ROUTES

//Create - Create a POST route (e.g., /api/users/register)
router.post('/register', async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: 'A user with that email already exists. Please try again.' });
    }

    const newUser = new User({
      username,
      email,
      password,
    });

    await newUser.save();

    const userResponse = newUser.toObject();
    delete userResponse.password;

    return res.status(201).json(userResponse);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//Build the Login Endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: 'Incorrect email or password.' });
    }

    const isMatch = await user.isCorrectPassword(password);

    if (!isMatch) {
      return res.status(400).json({ error: 'Incorrect email or password.' });
    }

    const payload = {
      _id: user._id,
      username: user.username,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '2h' });

    const userData = user.toObject();
    delete userData.password;

    return res.status(200).json({ token, user: userData });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;