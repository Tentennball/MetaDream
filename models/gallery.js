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
  }  
});

const gallerySchema = new Schema({
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
    },
    comments:[commentSchema]
  });
  
  module.exports = mongoose.model('Gallery', gallerySchema);