const express = require('express');
const router = require('express').Router();
const nodemailer = require('nodemailer');
const ContactUs = require('../models/ContactUs');
// Middleware to parse JSON and urlencoded form data
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
// POST route for form submission
router.post('/contactUs', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please fill in all fields.' });
  }
  const newContactUs = new ContactUs({
    name: name,
    email: email,
    message: message
  });
  newContactUs.save()
    .then(() => {
      sendEmail(name, email, message);
      return res.status(200).json({ message: 'Form submitted successfully.' });
    })
    .catch(error => {
      console.error('Error saving contactUs:', error);
      return res.status(500).json({ error: 'An error occurred while submitting the form.' });
    });
});
const sendEmail = async (name, email, message) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'earthypaving@gmail.com',
        pass: 'mkmvujxjaseqctlz'
      }
    });
    const mailOptions = {
      from: 'email',
      to: 'earthypaving@gmail.com',
      subject: 'New Contact Form Submission',
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error('Failed to send email');
  }
};
module.exports = router;