const mongoose = require('mongoose')

const NizaClassSchema = new mongoose.Schema({
    /* ClassInt: {
      type: mongoose.Types.ObjectId,
      ref: 'Class',
    }, */
    ClassInt: {
      type: Number
    },
    Description: {
      type: String,
    },
    IdNiza: {
      type: Number,
    },
    BaseNumber: {
      type: Number,
    },
    OrderNumberES: {
      type: String,
    },
    OrderNumberFR: {
      type: String,
    },
    Type: {
      type: String,
      enum: ['Productos', 'Servicios'], 
      required: true
    }
  });
  
//module.exports = mongoose.model('NizaClass',NizaClassSchema);
const NizaClass = mongoose.model('NizaClass', NizaClassSchema);
module.exports = { NizaClassSchema, NizaClass };