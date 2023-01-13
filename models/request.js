const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const requestSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref:'User',
      required: true
    }
  });
  
  module.exports = mongoose.model('Request', requestSchema);