
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import VehicleCard from '../components/VehicleCard';

function FleetPage() {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [typeFilter, setTypeFilter] = useState('All');
    const [selectedVehicle, setSelectedVehicle] = useState('');
    const [pickupDate, setPickupDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [message, setMessage] = useState('');

    const { auth } = useContext(AuthContext);

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const response = await axios.get('/api/v1/vehicles');
                setVehicles(response.data);
            } catch (err) {
                setError('Unable to load vehicles. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchVehicles();
    }, []);

    const filteredVehicles = vehicles.filter(
        (vehicle) => typeFilter === 'All' || vehicle.type === typeFilter
    );

    const handleBooking = async (e) => {
        e.preventDefault();
        setMessage('');

        if (!selectedVehicle || !pickupDate || !returnDate) {
            setMessage('Please complete all booking fields.');
            return;
        }

        if (returnDate <= pickupDate) {
            setMessage('Return date must be after pickup date.');
            return;
        }

        try {
            await axios.post(
                '/api/v1/bookings',
                {
                    vehicleId: selectedVehicle,
                    pickupDate,
                    returnDate
                },
                {
                    headers: { Authorization: `Bearer ${auth.token}` }
                }
            );

            setMessage('Booking created successfully.');
            setVehicles((previous) =>
                previous.map((vehicle) =>
                    vehicle._id === selectedVehicle
                        ? { ...vehicle, available: false }
                        : vehicle
                )
            );
            setSelectedVehicle('');
            setPickupDate('');
            setReturnDate('');
        } catch (err) {
            setMessage(err.response?.data?.message || 'Booking failed.');
        }
    };

    if (loading) return <p>Loading vehicles...</p>;
    if (error) return <p role="alert">{error}</p>;

    return (
        <main>
            <h1>Available Fleet</h1>

            <label htmlFor="typeFilter">Filter by type: </label>
            <select
                id="typeFilter"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
            >
                <option>All</option>
                <option>Hatchback</option>
                <option>Sedan</option>
                <option>SUV</option>
            </select>

            <div className="vehicle-grid">
                {filteredVehicles.map((vehicle) => (
                    <VehicleCard
                        key={vehicle._id}
                        model={vehicle.model}
                        type={vehicle.type}
                        pricePerDay={vehicle.pricePerDay}
                        available={vehicle.available}
                        onBook={() => setSelectedVehicle(vehicle._id)}
                    />
                ))}
            </div>

            <h2>Book a Vehicle</h2>
            <form onSubmit={handleBooking}>
                <label htmlFor="selectedVehicle">Selected vehicle:</label>
                <select
                    id="selectedVehicle"
                    value={selectedVehicle}
                    onChange={(e) => setSelectedVehicle(e.target.value)}
                    required
                >
                    <option value="">Select a vehicle</option>
                    {vehicles.filter((v) => v.available).map((vehicle) => (
                        <option key={vehicle._id} value={vehicle._id}>
                            {vehicle.model} - {vehicle.type}
                        </option>
                    ))}
                </select>

                <label htmlFor="pickupDate">Pickup date:</label>
                <input
                    id="pickupDate"
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    required
                />

                <label htmlFor="returnDate">Return date:</label>
                <input
                    id="returnDate"
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    required
                />

                <button type="submit">Confirm Booking</button>
            </form>

            {message && <p role="status">{message}</p>}
        </main>
    );
}

export default FleetPage;
