const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Child = require('../models/Child');

// GET /api/dashboard/parent - Get children linked to the logged-in parent
router.get('/dashboard/parent', authMiddleware, async (req, res) => {
  try {
    const parentId = req.user.id;
    const children = await Child.find({ parentId });
    res.json({ children });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving children' });
  }
});

module.exports = router;
