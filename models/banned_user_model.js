const mongoose = require('mongoose');


const bannedUserSchema = new mongoose.Schema({
    email : {
        type: String,
        required: true
    },
});


const BannedUser = mongoose.model('BannedUser', bannedUserSchema);

module.exports = BannedUser;