const express = require('express');
const router = express.Router();
const Station = require('../models/Station');
const authenticate = require('../middleware/authenticate'); // Importe le middleware d'authentification

// Middleware d'authentification appliqué à toutes les routes de cette routeur
router.use(authenticate);

// Get all stations
router.get('/', async (req, res) => {
  try {
    const stations = await Station.find().populate('lines');
    res.json(stations);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get station by ID
router.get('/:id', async (req, res) => {
  try {
    const station = await Station.findById(req.params.id).populate('lines');
    res.json(station);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Create a new station
router.post('/', async (req, res) => {
  try {
    const newStation = new Station(req.body);
    const savedStation = await newStation.save();
    res.json(savedStation);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

// Update a station
router.put('/:id', async (req, res) => {
  try {
    const updatedStation = await Station.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedStation);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Delete a station
router.delete('/:id', async (req, res) => {
  try {
    await Station.findByIdAndDelete(req.params.id);
    res.send('Station deleted');
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
