
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import FleetPage from './pages/FleetPage';
import MyBookingsPage from './pages/MyBookingsPage';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/ProtectedRoute';

const AdminPanel = lazy(() => import('./pages/AdminPanel'));

function App() {
  return (
    <Router>
      <NavBar />

      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route
          path="/fleet"
          element={
            <ProtectedRoute>
              <FleetPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute>
              <MyBookingsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <Suspense fallback={<div>Loading Admin Panel...</div>}>
              <AdminPanel />
            </Suspense>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
