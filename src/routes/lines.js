const express = require('express');
const router = express.Router();
const Line = require('../models/Line');
const authenticate = require('../middleware/authenticate'); // Importe le middleware d'authentification

// Middleware d'authentification appliqué à toutes les routes de cette routeur
router.use(authenticate);

// Get all lines
router.get('/', async (req, res) => {
  try {
    const lines = await Line.find().populate('stations');
    res.json(lines);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get line by ID
router.get('/:id', async (req, res) => {
  try {
    const line = await Line.findById(req.params.id).populate('stations');
    res.json(line);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Create a new line
router.post('/', async (req, res) => {
  try {
    const newLine = new Line(req.body);
    const savedLine = await newLine.save();
    res.json(savedLine);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Update a line
router.put('/:id', async (req, res) => {
  try {
    const updatedLine = await Line.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedLine);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Delete a line
router.delete('/:id', async (req, res) => {
  try {
    await Line.findByIdAndDelete(req.params.id);
    res.send('Line deleted');
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
