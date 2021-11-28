const mongoose = require('mongoose');

const CountrySchema = new mongoose.Schema({
    Code: {
      type: String,
      maxLength: [100, 'Superaste el máximo de caracteres permitidos'],
    },
    CodeISO: {
      type: String,
      required: true,
      maxLength: [3, 'Superaste el máximo de caracteres permitidos'],
    },
    Nationality: {
      type: String,
      maxLength: [100, 'Superaste el máximo de caracteres permitidos'],
    },
    Name: {
      type: String,
      required: true,
      maxLength: [100, 'Superaste el máximo de caracteres permitidos'],
    },  
    Zone: {
      type: String,
      maxLength: [20, 'Superaste el máximo de caracteres permitidos'],
    }, 
  });
  
//module.exports = mongoose.model('Country',CountrySchema);
 const Country = mongoose.model('Country', CountrySchema);
module.exports = { CountrySchema, Country };
  