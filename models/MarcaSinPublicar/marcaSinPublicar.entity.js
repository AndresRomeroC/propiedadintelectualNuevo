const mongoose = require('mongoose')

const MarcaSinPublicarSchema = new mongoose.Schema({

    tipoEstado: {
        type: String,
        enum: [
        'Inicial(Obtenida por el proceso de Marcas Sin Publicar)',
        'En atención',
        'Final'],
        default: 'Inicial(Obtenida por el proceso de Marcas Sin Publicar)',
      }, 
    marcaSinPublicar: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Marca',
    },    
    fechaCreacion: {
        type: Date, default: Date.now()
    }
    
  });
  
const MarcaSinPublicar = mongoose.model('MarcaSinPublicar', MarcaSinPublicarSchema);
module.exports = { MarcaSinPublicarSchema, MarcaSinPublicar };