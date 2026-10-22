import React from 'react';
import './VehicleCard.css'; // optional styling

const VehicleCard = ({ model, type, pricePerDay, available, onBook }) => (
  <div className="vehicle-card">
    <h3>{model}</h3>
    <p>Type: {type}</p>
    <p>Price per day: ${pricePerDay}</p>
    {available ? (
      <button className="book-btn" onClick={() => onBook && onBook({ model, type, pricePerDay, available })}>Book Now</button>
    ) : (
      <span className="badge not-available">Not Available</span>
    )}
  </div>
);

export default VehicleCard;
