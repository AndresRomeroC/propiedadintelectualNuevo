const mongoose = require('mongoose')

const MarcaPublicadaSchema = new mongoose.Schema({

    // tipoEstado: {
    //     type: String,
    //     enum: [
    //     'Inicial(Obtenida por el proceso de Marcas con estado Publicada )',
    //     'En atención(Trabajando en Renovación)',
    //     'Final(Resuelta, cambiar estado de Marca)'],
    //     default: 'Inicial(Obtenida por el proceso de Marcas con estado Publicada )'
    //   }, 
    marcaPublicada: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Marca',
    },
    fechaCreacion: {
        type: Date, default: Date.now()
    }
    
  });
  
const MarcaPublicada = mongoose.model('MarcaPublicada', MarcaPublicadaSchema);
module.exports = { MarcaPublicadaSchema, MarcaPublicada };