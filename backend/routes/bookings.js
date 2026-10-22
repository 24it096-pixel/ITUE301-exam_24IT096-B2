const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Vehicle = require('../models/Vehicle');
const Customer = require('../models/Customer');

// Helper to check vehicle availability
async function isVehicleAvailable(vehicleId) {
  const vehicle = await Vehicle.findById(vehicleId);
  return vehicle && vehicle.available;
}

/**
 * POST /api/v1/bookings
 * Create a new booking (protected).
 * Expected body: { vehicleId, pickupDate, returnDate }
 */
router.post('/', async (req, res, next) => {
  try {
    const { vehicleId, pickupDate, returnDate } = req.body;
    const customerId = req.user.customerId; // set by authGuard

    // Validate required fields
    if (!vehicleId || !pickupDate || !returnDate) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check vehicle availability
    const available = await isVehicleAvailable(vehicleId);
    if (!available) {
      return res.status(400).json({ message: 'Vehicle is not available for booking' });
    }

    // Create booking
    const booking = await Booking.create({
      customerId,
      vehicleId,
      pickupDate,
      returnDate,
    });

    // Mark vehicle as unavailable
    await Vehicle.findByIdAndUpdate(vehicleId, { available: false });

    res.status(201).json(booking);
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/v1/bookings/my
 * Return bookings of the authenticated customer (protected).
 */
router.get('/my', async (req, res, next) => {
  try {
    const customerId = req.user.customerId;
    const bookings = await Booking.find({ customerId })
      .populate('customerId', 'name email')
      .populate('vehicleId', 'model type');
    res.json(bookings);
  } catch (err) {
    next(err);
  }
});

/**
 * PATCH /api/v1/bookings/:id/status
 * Update booking status (protected).
 * Expected body: { status }
 */
router.patch('/:id/status', async (req, res, next) => {
  try {
    const { status } = req.body;
    const allowedStatuses = ['reserved', 'ongoing', 'completed', 'cancelled'];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
