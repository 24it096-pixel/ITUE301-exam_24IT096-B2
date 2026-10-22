const express = require('express');
const router = express.Router();
const Vehicle = require('../models/Vehicle');

// GET /api/v1/vehicles - public endpoint to list all vehicles
router.get('/', async (req, res, next) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
