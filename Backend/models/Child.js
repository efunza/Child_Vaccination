const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const vaccinationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true }
}, { _id: false });

const childSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  registrationId: {
    type: String,
    required: true,
    unique: true,
    default: uuidv4 // ✅ This must be a *function* (not the result)
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    required: true
  },
  vaccination: {
    type: [vaccinationSchema],
    default: []
  },
  parent: {
    name: { type: String },
    phone: { type: String },
    email: { type: String }
  }
}, { timestamps: true });

module.exports = mongoose.model('Child', childSchema);
