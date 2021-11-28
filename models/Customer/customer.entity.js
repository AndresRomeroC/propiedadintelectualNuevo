const mongoose = require('mongoose')

const CustomerSchema = new mongoose.Schema({
    Name: {
      type: String,
      required: true,
      maxLength: [200, 'Superaste el máximo de caracteres permitidos'],
    },
    Address: {
      type: String,
      maxLength: [200, 'Superaste el máximo de caracteres permitidos'],
    },
    Email: {
      type: String,
      maxLength: [100, 'Superaste el máximo de caracteres permitidos'],
    }, 
    CreatedDate: {
      type: Date,
      default: Date.now
    }, 
    TypeOfPerson: {
      type: String,
      maxLength: [30, 'Superaste el máximo de caracteres permitidos'],
      required: true,
      enum: {
        values: ['PN', 'PJ'],
        message: '{VALUE} no es soportado'
      }
    },
    PhoneNumber: {
      type: String,
      maxLength: [20, 'Superaste el máximo de caracteres permitidos'],
    },
    TypeOfContact: {
      type: String,
      maxLength: [30, 'Superaste el máximo de caracteres permitidos'],
      enum: {
        values: ['Cliente', 'Grupo', 'Corresponsal', 'Apoderado'],
        message: '{VALUE} no es soportado'
      }
    },
    Country: {
      type: mongoose.Types.ObjectId,
      ref: 'Country',
    }
  });
  
//module.exports = mongoose.model('Customer',CustomerSchema);
const Customer = mongoose.model('Customer', CustomerSchema);
module.exports = { CustomerSchema, Customer };