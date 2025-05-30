// routes/parentDashboard.js
const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');
const Child = require('../models/Child');

router.get('/', authenticate, async (req, res) => {
  try {
    // assuming child has a field parentEmail or parentId matching req.user.email
    const children = await Child.find({ parentEmail: req.user.email });
    res.json({ children });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

module.exports = router;
