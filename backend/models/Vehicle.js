const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  model: { type: String, required: true },
  type: { type: String, required: true }, // e.g., Hatchback, Sedan, SUV
  pricePerDay: { type: Number, required: true, min: 0 },
  available: { type: Boolean, default: true }
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
