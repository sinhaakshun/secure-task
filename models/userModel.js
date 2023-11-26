const mongoose = require('mongoose');



var userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        unique: true,
        required : true
    },
    password : {
        type : String,
        required : true
    }
})

const User = mongoose.model('userDetails', userSchema);

module.exports = User;