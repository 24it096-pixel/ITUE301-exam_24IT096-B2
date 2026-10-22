
require('dotenv').config();
const mongoose = require('mongoose');
const Vehicle = require('./models/Vehicle');

async function seedVehicles() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        const count = await Vehicle.countDocuments();

        if (count > 0) {
            console.log(`Vehicles already exist: ${count}`);
            return;
        }

        await Vehicle.insertMany([
            {
                model: 'Maruti Swift',
                type: 'Hatchback',
                pricePerDay: 1500,
                available: true
            },
            {
                model: 'Honda City',
                type: 'Sedan',
                pricePerDay: 2500,
                available: true
            },
            {
                model: 'Hyundai Creta',
                type: 'SUV',
                pricePerDay: 3000,
                available: true
            }
        ]);

        console.log('3 vehicles added successfully.');
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await mongoose.disconnect();
    }
}

seedVehicles();
