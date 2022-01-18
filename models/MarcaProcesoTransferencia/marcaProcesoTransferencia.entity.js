const mongoose = require('mongoose')

const MarcaProcesoTransferenciaSchema = new mongoose.Schema({

    tipoEstado: {
        type: String,
        enum: [
        'Inicial(Obtenida por el proceso de Marcas con estado en Proceso de Trasnferencia)',
        'En atención(Trabajando en Renovación)',
        'Final(Resuelta, cambiar estado de Marca)'],
        default: 'Inicial(Obtenida por el proceso de Marcas con estado en Proceso de Trasnferencia)',
      }, 
    marcaProcesoTransferenciaMeses: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Marca',
    },
    fechaCreacion: {
        type: Date, default: Date.now()
    }
    
  });
  
const MarcaProcesoTransferencia = mongoose.model('MarcaProcesoTransferencia', MarcaProcesoTransferenciaSchema);
module.exports = { MarcaProcesoTransferenciaSchema, MarcaProcesoTransferencia };