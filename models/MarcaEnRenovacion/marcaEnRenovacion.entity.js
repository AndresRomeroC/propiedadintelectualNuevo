const mongoose = require('mongoose')

const MarcaEnRenovacionSchema = new mongoose.Schema({

    tipoEstado: {
        type: String,
        enum: [
        'Inicial(Obtenida por el proceso de Marcas en Renovación)',
        'En atención',
        'Final'],
        default: 'Inicial(Obtenida por el proceso de Marcas en Renovación)',
      }, 
    marcaEnRenovacion: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Marca',
    },
    fechaCreacion: {
        type: Date, default: Date.now()
    }
    
  });
  
const MarcaEnRenovacion = mongoose.model('MarcaEnRenovacion', MarcaEnRenovacionSchema);
module.exports = { MarcaEnRenovacionSchema, MarcaEnRenovacion };