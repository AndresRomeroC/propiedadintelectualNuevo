// const Estados = new mongoose.Schema({
//   name: String,
//   tipoEstado: {
//     type: String,
//     enum: [
//     'En trámite',
//     'No presentada',
//     'Publicada',
//     'Pago de tasa de registro',
//     'Registrada',
//     'Renovada',
//     'No renovar',
//     'Transferida',
//     'Vencida',
//     'Desistida',
//     'Cancelada',
//     'Anulada',
//     'Negada',
//     'Inactiva',
//     'Suspedida',
//     'Abandono',
//     'Oposición',
//     'Concedida',
//     'Recurso de Reposición',
//     'Recurso de Revisión',
//     'Caducidad del trámite',
//     'Caducidad del trámite de renovación',
//     'En proceso de cambio de nombre',
//     'En proceso de transferencia',
//     'En proceso de renovación',
//     'En proceso de cancelación',
//     'Recurso de reposición'  ],
//   },
// });

// const OtherSchema = new mongoose.Schema({
//   name: String,
//   arrayed: {
//     type: [Estados],
//   },
// });

const mongoose = require('mongoose');

const MarcaSchema = new mongoose.Schema({
    titular: {
      type: String,
      required: true
    },
    denominacionCompleta: {
      type: String,
    },
    claseInternacionalId: {
      type: mongoose.SchemaTypes.ObjectId,      
      ref: 'ClaseInternacional',
    },
    fechaSolicitud: {
      type: Date, default: Date.now()
    }, 
    numeroSolicitud: {
      type: Number,
    },
    fechaTitulo: {
      type: Date, default: Date.now()
    },
    numeroTitulo: {
      type: Number
    },
    tipoEstados: {
      type: String,
      enum: [
      'En trámite',
      'No presentada',
      'Publicada',
      'Pago de tasa de registro',
      'Registrada',
      'Renovada',
      'No renovar',
      'Transferida',
      'Vencida',
      'Desistida',
      'Cancelada',
      'Anulada',
      'Negada',
      'Inactiva',
      'Suspedida',
      'Abandono',
      'Oposición',
      'Concedida',
      'Recurso de Reposición',
      'Recurso de Revisión',
      'Caducidad del trámite',
      'Caducidad del trámite de renovación',
      'En proceso de cambio de nombre',
      'En proceso de transferencia',
      'En proceso de renovación',
      'En proceso de cancelación',
      'Recurso de reposición'  ],
      default: 'En trámite',
    }, 
    tipoRegistro:{
      type: String,
      enum: [
      'Local',
      'Local extranjero', 
      'Extranjero local', 
      'Internacional ' ],
    },
    countryId: {
      type: mongoose.SchemaTypes.ObjectId,      
      ref: 'Country',
    },
    gacetaId: {
      type: mongoose.SchemaTypes.ObjectId,      
      ref: 'Gaceta',
    },
    
    // otherField: {
    //   type: [OtherSchema],
    // },
    

  });

const Marca = mongoose.model('Marca', MarcaSchema);
module.exports = { MarcaSchema, Marca };
  
