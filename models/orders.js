const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true

    },
    state : {
        type : String,
        enum : ['pending','success' , 'failed'],
        default: 'pending',
    },
    course : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    price: {
        type:Number,
        required : true
    },
    createdAt:{
        type: Date,
        default: new Date()
    }
})


module.exports = mongoose.model('Order',orderSchema);