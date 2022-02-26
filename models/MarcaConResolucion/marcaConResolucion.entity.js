const mongoose = require('mongoose')

const MarcaConResolucionSchema = new mongoose.Schema({

  // tipoEstado: {
  //     type: String,
  //     enum: [
  //     'Inicial(Obtenida por el proceso de Marcas con Resolución)',
  //     'En atención(Trabajando en la Resolución)',
  //     'Final(Resuelta)'],
  //     default: 'Inicial(Obtenida por el proceso de Marcas con Resolución)',
  //   }, 
  marcaConResolucion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Marca',
  },
  numeroResolucion: {
    type: Number
  },
  fechaResolucion: {
    type: Date, //default: Date.now()
  },
    fechaCreacion: {
        type: Date, default: Date.now()
    }
    
  });
  
const MarcaConResolucion = mongoose.model('MarcaConResolucion', MarcaConResolucionSchema);
module.exports = { MarcaConResolucionSchema, MarcaConResolucion };