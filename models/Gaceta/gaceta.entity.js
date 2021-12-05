const mongoose = require('mongoose')

const GacetaSchema = new mongoose.Schema({
    NumberId: {
      type: Number,
      required: true,
      index: true,
    unique: true 
    },
    Year: {
      type: String,
    },
    Month: {
      type: String,
    },
    Quincena: {
      type: String,
      enum: ['Primera', 'Segunda'], 
    },
    UploadDate: {
      type: Date,
      default: Date.now
    },
    PublicationDate: {
      type: Date
    }, 
    profileExcelLocation: {
      type: String,
      

    }, 

  });
  
//module.exports = mongoose.model('Gaceta',GacetaSchema);
const Gaceta = mongoose.model('Gaceta', GacetaSchema);
module.exports = { GacetaSchema, Gaceta };