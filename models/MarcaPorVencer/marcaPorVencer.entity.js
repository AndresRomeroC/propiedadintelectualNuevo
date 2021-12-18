const mongoose = require('mongoose')

const MarcaPorVencerSchema = new mongoose.Schema({

    tipoEstado: {
        type: String,
        enum: [
        'Inicial(Obtenida por el proceso de Marcas por Vencer)',
        'En atención(Trabajando en Renovación)',
        'Final(Resuelta, cambiar estado de Marca)'],
        default: 'Inicial(Obtenida por el proceso de Marcas por Vencer)',
      }, 
    marcaPorVencerMeses: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Marca',
    },
    cantidadPorVencerMeses:{
        type: Number,
        default: 0,
    },
    fechaPorVencer: {
      type: Date, 
  },
    fechaCreacion: {
        type: Date, default: Date.now()
    }
    
  });
  
const MarcaPorVencer = mongoose.model('MarcaPorVencer', MarcaPorVencerSchema);
module.exports = { MarcaPorVencerSchema, MarcaPorVencer };