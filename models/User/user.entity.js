const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
      type: String,
      maxLength: [100, 'Superaste el máximo de caracteres permitidos'],
    },
    email: {
      type: String,
      maxLength: [100, 'Superaste el máximo de caracteres permitidos'],
    }, 
    CreatedDate: {
      type: Date,
      default: Date.now
    },
    encryptedPassword: {
      type: String, 
      required: true 
    },
    Role: { 
      type: String, 
      enum: ['admin', 'normal'], 
      required: true
    },
    avatar: String,
  });
  
module.exports = mongoose.model('User',UserSchema);
//const User = mongoose.model('User', UserSchema);
//module.exports = { UserSchema, User };