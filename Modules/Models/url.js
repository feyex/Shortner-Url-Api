const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const urlShortnerSchema = new mongoose.Schema({

  longUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },

}, {
    timestamps: true
});

module.exports = mongoose.model('Url', urlShortnerSchema);