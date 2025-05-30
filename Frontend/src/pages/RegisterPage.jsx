import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('parent');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, role }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Registration failed');
      }

      const { token, user } = await response.json();

      // Store auth info
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Redirect to dashboard
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister} style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>Register</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: '100%', marginBottom: 10, padding: 8 }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        required
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: '100%', marginBottom: 10, padding: 8 }}
      />

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        style={{ width: '100%', marginBottom: 10, padding: 8 }}
      >
        <option value="parent">Parent</option>
        <option value="admin">Admin</option>
      </select>

      <button type="submit" style={{ width: '100%', padding: 10 }} disabled={loading}>
        {loading ? 'Signing Up...' : 'Sign Up'}
      </button>

      {error && <p style={{ color: 'red', marginTop: 10 }}>{error}</p>}
    </form>
  );
}
