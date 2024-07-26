const express = require('express');
const twilio = require('twilio');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.post('/voice', (req, res) => {
  try {
    const twiml = new twilio.twiml.VoiceResponse();
    twiml.say('Hello, this is your deployed server. The voice assistant is working!');
    res.type('text/xml');
    res.send(twiml.toString());
  } catch (error) {
    console.error('Error in /voice endpoint:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app; // Important for Vercel
