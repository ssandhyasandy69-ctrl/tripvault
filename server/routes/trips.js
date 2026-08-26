const express = require('express');
const Trip = require('../models/Trip');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

// All trip routes require a valid JWT
router.use(protect);

// @route   POST /api/trips
// @desc    Create a new trip for the logged-in user
router.post('/', async (req, res) => {
  try {
    const { title, destination, startDate, endDate, description, rating } = req.body;

    if (!title || !destination) {
      return res.status(400).json({ message: 'Title and destination are required' });
    }

    const trip = await Trip.create({
      title,
      destination,
      startDate,
      endDate,
      description,
      rating,
      user: req.user.id,
    });

    return res.status(201).json(trip);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error creating trip' });
  }
});

// @route   GET /api/trips
// @desc    Get all trips belonging to the logged-in user only
router.get('/', async (req, res) => {
  try {
    const trips = await Trip.find({ user: req.user.id }).sort({ createdAt: -1 });
    return res.status(200).json(trips);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error fetching trips' });
  }
});

// @route   GET /api/trips/:id
// @desc    Get a single trip by id (must belong to the user)
router.get('/:id', async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    if (trip.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to view this trip' });
    }

    return res.status(200).json(trip);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error fetching trip' });
  }
});

// @route   PUT /api/trips/:id
// @desc    Update a trip (owner only)
router.put('/:id', async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    if (trip.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this trip' });
    }

    const { title, destination, startDate, endDate, description, rating } = req.body;

    trip.title = title ?? trip.title;
    trip.destination = destination ?? trip.destination;
    trip.startDate = startDate ?? trip.startDate;
    trip.endDate = endDate ?? trip.endDate;
    trip.description = description ?? trip.description;
    trip.rating = rating ?? trip.rating;

    const updatedTrip = await trip.save();
    return res.status(200).json(updatedTrip);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error updating trip' });
  }
});

// @route   DELETE /api/trips/:id
// @desc    Delete a trip (owner only)
router.delete('/:id', async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    if (trip.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this trip' });
    }

    await trip.deleteOne();
    return res.status(200).json({ message: 'Trip deleted successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error deleting trip' });
  }
});

module.exports = router;
