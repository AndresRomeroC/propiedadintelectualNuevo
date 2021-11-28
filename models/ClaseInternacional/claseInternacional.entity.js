const mongoose = require('mongoose');

const ClaseInternacionalSchema = new mongoose.Schema({
    ClassInt: {
      type: Number,
      required: true
    },
    Description: {
      type: String,
    },
    Type: {
      type: String,
      enum: ['Marca de Productos', 'Marca de Servicios', 'Lema Comercial', 'Marca Colectiva', 'Denominación Origen', 'Rótulo Enseña', 'Marca de Certificación', 'Apariencia Distintiva' , 'Indicación Geográfica', 'Nombre Comercial'], 
      required: true
    }
  });
  
//module.exports = mongoose.model('ClaseInternacional',ClaseInternacionalSchema);
const ClaseInternacional = mongoose.model('ClaseInternacional', ClaseInternacionalSchema);
module.exports = { ClaseInternacionalSchema, ClaseInternacional };