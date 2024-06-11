const mongoose = require('mongoose');

const LineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['tourism', 'freight'], required: true },
  stations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Station' }]
});

module.exports = mongoose.model('Line', LineSchema);
