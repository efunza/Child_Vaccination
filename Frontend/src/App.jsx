import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboard from './pages/AdminDashboard';
import ParentDashboard from './pages/ParentDashboard';
import { AuthProvider } from './auth/AuthContext';
import PrivateRoute from './auth/PrivateRoute';

function RoleBasedDashboard() {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) return null;
  return user.role === 'admin' ? <AdminDashboard /> : <ParentDashboard />;
}

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <RoleBasedDashboard />
          </PrivateRoute>
        } />
      </Routes>
    </AuthProvider>
  );
}

export default App;
