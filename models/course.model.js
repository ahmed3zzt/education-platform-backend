const mongoose = require('mongoose');


const courseSchema = new mongoose.Schema({

    title : {
        type: String,
        required: true
    },
    price : {
        type: Number,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    author : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    image : {
        type: String,
    },

    category :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    slug:{
        type: String,
        required: true
    }
});


const Course = mongoose.model('Course', courseSchema);

module.exports = Course;