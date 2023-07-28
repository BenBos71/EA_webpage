const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000; // Replace with your desired port number

// Middleware
app.use(bodyParser.json());

// POST endpoint to receive word descriptions and send email
app.post('/send-descriptions', (req, res) => {
  const wordDescriptions = req.body;

  // Replace the following with your email configuration
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // Replace with your email service provider
    auth: {
      user: 'dummyxxxdummy5@gmail.com', // Replace with your email address
      pass: 'dummyPass', // Replace with your email password
    },
  });

  const mailOptions = {
    from: 'dummyxxxdummy5@gmail.com', // Replace with your email address
    to: 'johnbos@mail.weber.edu', // Replace with the recipient email address
    subject: 'Word Descriptions Submission',
    text: JSON.stringify(wordDescriptions, null, 2), // Convert the object to a nicely formatted JSON string
  };

  // Sending the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
