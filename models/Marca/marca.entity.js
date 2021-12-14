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
  denominacionCompleta: {
    type: String,
    required: true
  },  
  titular: {
      type: String,
      required: true
    },
    
    claseInternacionalId: {
      type: mongoose.SchemaTypes.ObjectId,      
      ref: 'ClaseInternacional',
    },
    fechaSolicitud: {
      type: Date, default: Date.now()
    }, 
    numeroSolicitud: {
      type: String,
    },
    fechaTitulo: {
      type: Date, default: Date.now()
    },
    numeroTitulo: {
      type: Number
    },
    tipoEstado: {
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
    documentoAdjunto:String,
    fechaCreacion: {
      type: Date, default: Date.now()
    },
    marcaConSimilitudExacta: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Marca',
      },
    ],
    // marcaConSimilitudMedia: {
    //   type: mongoose.SchemaTypes.ObjectId,      
    //   ref: 'Marca',
    // },
    marcaConSimilitudMedia: 
    [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Marca',
      },
    ],
    // content: {
    //   type: String,
    // }, 
    // otherField: {
    //   type: [OtherSchema],
    // },
    

  });

const Marca = mongoose.model('Marca', MarcaSchema);
module.exports = { MarcaSchema, Marca };
  
