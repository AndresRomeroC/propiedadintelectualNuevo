const mongoose = require('mongoose')

const MarcaProcesoLicenciadaSchema = new mongoose.Schema({

    tipoEstado: {
        type: String,
        enum: [
        'Inicial(Obtenida por el proceso de Marcas con emisión de Licencia)',
        'En atención',
        'Final'],
        default: 'Inicial(Obtenida por el proceso de Marcas con emisión de Licencia)',
      }, 
    marcaProcesoLicenciada: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Marca',
    },
    fechaCreacion: {
        type: Date, default: Date.now()
    }
    
  });
  
const MarcaProcesoLicenciada = mongoose.model('MarcaProcesoLicenciada', MarcaProcesoLicenciadaSchema);
module.exports = { MarcaProcesoLicenciadaSchema, MarcaProcesoLicenciada };