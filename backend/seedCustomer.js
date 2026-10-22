
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Customer = require('./models/Customer');

async function createCustomer() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        const email = 'student@example.com';
        const existing = await Customer.findOne({ email });

        if (existing) {
            console.log('Customer already exists:', email);
            return;
        }

        const password = 'DriveEasy@123';
        const hashedPassword = await bcrypt.hash(password, 10);

        await Customer.create({
            name: 'Test Customer',
            email,
            licenseNumber: 'DL-TEST-001',
            password: hashedPassword
        });

        console.log('Customer created successfully.');
        console.log('Email:', email);
        console.log('Password:', password);
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await mongoose.disconnect();
    }
}

createCustomer();
