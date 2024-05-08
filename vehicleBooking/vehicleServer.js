const express = require('express');
const bodyParser = require('body-parser');
const { sendEmail } = require('./emailService'); // Assuming you have an email service file

const app = express();
app.use(bodyParser.json());

app.post('/booking', (req, res) => {
    const { name, dateTime } = req.body;
    // Logic to send email to store manager
    sendEmail('it@everbolt.lk', 'New Booking Request', `Name: ${name}\nDate and Time: ${dateTime}`);
    res.status(200).send('Booking request sent');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


