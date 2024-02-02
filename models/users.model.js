const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    username: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		validate: {
			validator: validator.isEmail,
			message: 'Please Enter Valid Email'
		},
		unique: true
	},
	password: {
		type: String,
		required: true
	},
    role:{
        type: String,
        default: 'student',
        enum: ['student', 'admin','teacher']
    }
});


const User = mongoose.model('User', userSchema);

module.exports = User;