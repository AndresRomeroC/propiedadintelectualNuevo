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
    profileExcelLocation: String,
    totalRegistrosImportados: {
      type: Number,
    },
    sinSimilitud:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Marca',
      },
    ],
    conSimilitudExacta: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Marca',
      },
    ],
    conSimilitudMedia: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Marca',
      },
    ],
  });
  
//module.exports = mongoose.model('Gaceta',GacetaSchema);
const Gaceta = mongoose.model('Gaceta', GacetaSchema);
module.exports = { GacetaSchema, Gaceta };