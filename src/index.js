// index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { router: authRouter, authenticate } = require('./routes/auth'); // Import the router and authenticate middleware

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/stations', require('./routes/stations'));
app.use('/lines', require('./routes/lines'));
app.use('/auth', authRouter); app.use("/auth/login", authRouter); // Apply the auth router to the /auth route
app.use("/auth/register", authRouter); // Apply the auth router to the /auth route
app.use(authenticate); // Apply the authenticate middleware to all routes below this line
// Connect to MongoDB and start the server
mongoose.connect('mongodb://localhost:27017/trainnetwork', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}).catch(err => console.log(err));
