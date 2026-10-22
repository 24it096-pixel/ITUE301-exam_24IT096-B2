
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './NavBar.css';

function NavBar() {
  const { auth, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <h2>DriveEasy</h2>
      <ul>
        <li><Link to="/">Login</Link></li>
        <li><Link to="/fleet">Fleet</Link></li>
        <li><Link to="/my-bookings">My Bookings</Link></li>
        <li><Link to="/admin">Admin</Link></li>
        {auth?.token && (
          <li>
            <button onClick={logout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
