import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Add Link import
import { useAuth } from '../auth/AuthContext';

const LoginPage = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) navigate('/dashboard');
    else alert('Login failed. Please check your email and password.');
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <h2>Login</h2>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        type="email"
        style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
      />
      <button type="submit" style={{ width: '100%', padding: '10px' }}>Login</button>
      <p style={{ marginTop: '10px', textAlign: 'center' }}>
        Don’t have an account? <Link to="/register">Sign up</Link>
      </p>
    </form>
  );
};

export default LoginPage;
