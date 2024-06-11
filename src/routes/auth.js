// routes/auth.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');
const User = require('../models/User');

// Route for user registration
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username is already taken
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Ce nom d\'utilisateur est déjà pris.' });
    }

    // Create a new user
    const newUser = new User({ username, password });
    await newUser.save();

    res.status(201).json({ message: 'Utilisateur enregistré avec succès.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur lors de l\'enregistrement de l\'utilisateur.' });
  }
});

// Route for user login and token generation
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(401).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect.' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur lors de l\'authentification de l\'utilisateur.' });
  }
});

// Middleware function to verify JWT token
const authenticate = (req, res, next) => {

    // Get the token from the header
  const token = req.header('Authorization');

  if (!token) {
    console.error("No token found");
    return res.status(401).json({ message: 'Accès non autorisé. Token manquant.' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user;
    console.log("User authenticated:", req.user);
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Token invalide.' });
  }
};

module.exports = { router, authenticate };
