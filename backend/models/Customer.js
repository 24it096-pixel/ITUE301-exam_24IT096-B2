const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  licenseNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true } // store hashed password
});

module.exports = mongoose.model('Customer', customerSchema);
