
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function MyBookingsPage() {
    const { auth } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get('/api/v1/bookings/my', {
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                });

                setBookings(response.data);
            } catch (err) {
                setError('Unable to load your bookings.');
            } finally {
                setLoading(false);
            }
        };

        if (auth?.token) fetchBookings();
        else setLoading(false);
    }, [auth?.token]);

    if (loading) return <p>Loading bookings...</p>;
    if (error) return <p role="alert">{error}</p>;

    return (
        <main>
            <h1>My Bookings</h1>

            {bookings.length === 0 ? (
                <p>No bookings found.</p>
            ) : (
                bookings.map((booking) => (
                    <article key={booking._id}>
                        <p>Vehicle: {booking.vehicleId?.model || 'Vehicle details unavailable'}</p>
                        <p>Type: {booking.vehicleId?.type || 'N/A'}</p>
                        <p>Pickup: {booking.pickupDate?.slice(0, 10)}</p>
                        <p>Return: {booking.returnDate?.slice(0, 10)}</p>
                        <p>Status: {booking.status}</p>
                        <hr />
                    </article>
                ))
            )}
        </main>
    );
}

export default MyBookingsPage;
