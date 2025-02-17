require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Twilio Credentials (store in .env file)
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

let otpStore = {}; // Temporary in-memory storage

// Generate and send OTP
app.post('/send-otp', (req, res) => {
    const { phoneNumber } = req.body;

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    otpStore[phoneNumber] = otp;

    // Send OTP via Twilio
    client.messages.create({
        body: `Your OTP is: ${otp}`,
        from: twilioPhone,
        to: phoneNumber
    }).then(() => {
        res.json({ success: true, message: 'OTP sent successfully!' });
    }).catch(error => {
        res.status(500).json({ success: false, error: error.message });
    });
});

// Verify OTP
app.post('/verify-otp', (req, res) => {
    const { phoneNumber, otp } = req.body;

    if (otpStore[phoneNumber] && otpStore[phoneNumber] == otp) {
        delete otpStore[phoneNumber]; // OTP verified, remove from storage
        res.json({ success: true, message: 'OTP verified!' });
    } else {
        res.status(400).json({ success: false, message: 'Invalid OTP!' });
    }
});

// Start server
app.listen(5000, () => {
    console.log('Server running on port 5000');
});
