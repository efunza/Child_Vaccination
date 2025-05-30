// routes/auth.js

const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const users = require('../data/users'); // simple in-memory array
const router = express.Router();

// LOGIN Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);

  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET || 'mysecretkey',
    { expiresIn: '1h' }
  );

  res.json({
    token,
    user: { id: user.id, email: user.email, role: user.role }
  });
});

// REGISTER Route
router.post('/register', async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  if (users.find(u => u.email === email)) {
    return res.status(409).json({ message: 'Email already in use' });
  }

  const hashed = await bcrypt.hash(password, 10);

  const newUser = {
    id: users.length + 1,
    email,
    password: hashed,
    role: role || 'parent',
  };

  users.push(newUser);

  const token = jwt.sign(
    { id: newUser.id, email: newUser.email, role: newUser.role },
    process.env.JWT_SECRET || 'mysecretkey',
    { expiresIn: '1h' }
  );

  res.status(201).json({
    token,
    user: { id: newUser.id, email: newUser.email, role: newUser.role }
  });
});

module.exports = router;
