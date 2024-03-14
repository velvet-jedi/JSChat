// message model file

const mongoose = require('mongoose');

// structure the message schema
const MessageSchema = new mongoose.Schema({
     name : String, message : String
})

// export a Mongoose model named 'Message' based on the 'MessageSchema'
module.exports = mongoose.model('Message',MessageSchema);
