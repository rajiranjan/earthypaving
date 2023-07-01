
const mongoose = require('mongoose');
// Define the schema
const contactUsSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});
// Create the ContactUs model
const ContactUs = mongoose.model('ContactUs', contactUsSchema);
module.exports = ContactUs;