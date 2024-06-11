const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/stations', require('./routes/stations'));
app.use('/lines', require('./routes/lines'));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/trainnetwork', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
