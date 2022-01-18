const mongoose = require('mongoose')

const MarcaProcesoCambioNombreSchema = new mongoose.Schema({

    tipoEstado: {
        type: String,
        enum: [
        'Inicial(Obtenida por el proceso de Marcas con cambio de Nombre)',
        'En atención',
        'Final'],
        default: 'Inicial(Obtenida por el proceso de Marcas con cambio de Nombre)',
      }, 
    marcaProcesoCambioNombreMeses: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Marca',
    },
    fechaCreacion: {
        type: Date, default: Date.now()
    }
    
  });
  
const MarcaProcesoCambioNombre = mongoose.model('MarcaProcesoCambioNombre', MarcaProcesoCambioNombreSchema);
module.exports = { MarcaProcesoCambioNombreSchema, MarcaProcesoCambioNombre };