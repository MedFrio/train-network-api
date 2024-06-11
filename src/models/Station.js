const mongoose = require('mongoose');

const StationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  lines: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Line' }]
});

module.exports = mongoose.model('Station', StationSchema);
