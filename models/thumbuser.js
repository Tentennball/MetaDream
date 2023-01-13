const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const thumbSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref:'User',
        required: true
      }
});

module.exports = mongoose.model('Thumb', thumbSchema);