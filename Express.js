// Basic Express backend with in-memory data
const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());

let children = [];

app.get('/children', (req, res) => res.json(children));

app.post('/children', (req, res) => {
  const child = { ...req.body, id: uuidv4() };
  children.push(child);
  res.status(201).json(child);
});

app.put('/children/:id', (req, res) => {
  const index = children.findIndex(c => c.id === req.params.id);
  if (index === -1) return res.status(404).send();
  children[index] = { ...req.body };
  res.json(children[index]);
});

app.delete('/children/:id', (req, res) => {
  children = children.filter(c => c.id !== req.params.id);
  res.status(204).send();
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
