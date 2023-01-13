const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema=new Schema({
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
  },
  
});

const communitySchema = new Schema({
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
    imageUrl: {
      type: String,
      required: false
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref:'User',
      required: true
    },
    name: {
      type: String,
      ref:'User',
      required: true
    },
    viewCounts: {
      type: Number,
      default: 0,
      required: true
    },
    comments:[commentSchema]
  });
  
  module.exports = mongoose.model('Community', communitySchema);