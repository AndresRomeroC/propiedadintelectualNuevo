const mongoose = require('mongoose')

const MarcaEnOposicionSchema = new mongoose.Schema({

    tipoEstado: {
        type: String,
        enum: [
        'Inicial(Obtenida por el proceso de Marcas en Oposición)',
        'En atención',
        'Final'],
        default: 'Inicial(Obtenida por el proceso de Marcas en Oposición)',
      }, 
    marcaEnOposicion: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Marca',
    },
    fechaCreacion: {
        type: Date, default: Date.now()
    }
    
  });
  
const MarcaEnOposicion = mongoose.model('MarcaEnOposicion', MarcaEnOposicionSchema);
module.exports = { MarcaEnOposicionSchema, MarcaEnOposicion };