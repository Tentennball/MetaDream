const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    posts:{
        personalrequest:[{
            postId:{
                type:Schema.Types.ObjectId,
                ref:'Request',
                required:true
            }
        }],
        // enterpriserequest:[{
        //     postId:{
        //         type:Schema.Types.ObjectId,
        //         ref:'Request',
        //         required:true
        //     }
        // }],
        // gallery:[{
        //     postId:{
        //         type:Schema.Types.ObjectId,
        //         ref:'Gallery',
        //         required:true
        //     }
        // }],
        community:[{
            postId:{
                type:Schema.Types.ObjectId,
                ref:'Community',
                required:true
            }
        }]
    }
  });
  
  module.exports = mongoose.model('User', userSchema);