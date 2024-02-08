const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
   title:{
    type: String,
    required: true
   },
   course:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
   },
   url :{
      type: String,
      required: true
   },
   description:{
      type: String,
   }
});


module.exports = mongoose.model('Video', videoSchema);

