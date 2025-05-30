const mongoose = require('mongoose');

const childSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  vaccination: [String],
  parentName: String,
  parentPhone: String,
  parentEmail: String,
}, { timestamps: true });

module.exports = mongoose.model('Child', childSchema);
