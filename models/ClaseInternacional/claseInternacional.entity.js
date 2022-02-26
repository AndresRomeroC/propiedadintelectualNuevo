const mongoose = require('mongoose');

const ClaseInternacionalSchema = new mongoose.Schema({
    classInt: {
      type: String,
      required: true
    },
    descriptionClassInt: {
      type: String,
    },
    typeClassInt: {
      type: String,
      enum: ['Marca de Productos', 'Marca de Servicios', 'Lema Comercial', 'Marca Colectiva', 'Denominación Origen', 'Rótulo Enseña', 'Marca de Certificación', 'Apariencia Distintiva' , 'Indicación Geográfica', 'Nombre Comercial'], 
      required: true
    }
  });
  
//module.exports = mongoose.model('ClaseInternacional',ClaseInternacionalSchema);
const ClaseInternacional = mongoose.model('ClaseInternacional', ClaseInternacionalSchema);
module.exports = { ClaseInternacionalSchema, ClaseInternacional };