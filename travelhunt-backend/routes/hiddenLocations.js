const express = require('express');
const router = express.Router();
const HiddenLocation = require('../models/HiddenLocation');
const adminAuth = require('../middleware/adminAuth');

// POST: Create a new hidden location (admin only)
router.post('/', adminAuth, async (req, res) => {
  try {
    const { locationName, latitude, longitude, description, imageUrl, culturalSignificance, challenges, quizzes } = req.body;

    const newLocation = new HiddenLocation({
      locationName,
      latitude,
      longitude,
      description,
      imageUrl,
      culturalSignificance,
      challenges,
      quizzes
    });

    await newLocation.save();
    res.status(201).json(newLocation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating location', error: error.message });
  }
});

// GET: Fetch hidden locations by city (using locationName as city)
router.get('/:city', async (req, res) => {
  try {
    const city = req.params.city;
    const locations = await HiddenLocation.find({ locationName: city });

    if (locations.length === 0) {
      return res.status(404).json({ message: 'No hidden locations found in this city' });
    }

    res.status(200).json(locations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching hidden locations', error: error.message });
  }
});

// GET: Fetch all hidden locations
router.get('/', async (req, res) => {
  try {
    const locations = await HiddenLocation.find({});

    if (locations.length === 0) {
      return res.status(404).json({ message: 'No hidden locations found' });
    }

    res.status(200).json(locations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching hidden locations', error: error.message });
  }
});

module.exports = router;
