const mongoose = require('mongoose');

// Define the schema for booked slots
const bookingSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  slot: {
    type: String,
    required: true
  },
  meeting: {
    type: String,
    required: true
  }
});

// Create a model based on the schema
const Booking = mongoose.model('Booking', bookingSchema);

// Export the model
module.exports = Booking;
