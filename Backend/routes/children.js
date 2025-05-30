const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const Child = require('../models/Child');

// GET all children
router.get('/', async (req, res) => {
  const children = await Child.find();
  res.json(children);
});

// POST a new child
router.post('/', async (req, res) => {
  const child = new Child({ ...req.body, id: uuidv4() });
  await child.save();
  res.status(201).json(child);
});

// PUT to update a child
router.put('/:id', async (req, res) => {
  const updated = await Child.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
  if (!updated) return res.status(404).json({ error: 'Child not found' });
  res.json(updated);
});

// DELETE a child
router.delete('/:id', async (req, res) => {
  await Child.findOneAndDelete({ id: req.params.id });
  res.status(204).send();
});

module.exports = router;
