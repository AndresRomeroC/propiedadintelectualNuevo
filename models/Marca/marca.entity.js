const mongoose = require('mongoose');

//  const EstadosMulti = new mongoose.Schema({
//    // name: String,
//     tipoEstado: {
//     type: String,
//      enum: [
//      'En trámite',
//      'No presentada',
//      'Publicada',
//      'Pago de tasa de registro',
//      'Registrada',
//      'Renovada',
//      'No renovar',
//      'Transferida',
//      'Vencida',
//      'Desistida',
//      'Cancelada',
//      'Anulada',
//      'Negada',
//      'Inactiva',
//      'Suspedida',
//      'Abandono',
//      'Oposición',
//      'Concedida',
//      'Recurso de Reposición',
//      'Recurso de Revisión',
//      'Caducidad del trámite',
//      'Caducidad del trámite de renovación',
//      'En proceso de cambio de nombre',
//      'En proceso de transferencia',
//      'En proceso de renovación',
//      'En proceso de cancelación',
//      'Recurso de reposición'  ],
//    },
//  });

// const OtherSchema = new mongoose.Schema({
//   //name: String,
//   //arrayed: {
//     type: [EstadosMulti],
//   //},
// });

// const TipoRegistroRol = new mongoose.Schema({
 
//   name: String,
//   arrayed: {
//     type: [
//     'Local',
//     'Local extranjero', 
//     'Extranjero local', 
//     'Internacional ' ],
  
//   },
// });

const MarcaSchema = new mongoose.Schema({
  denominacionCompleta: {
    type: String,
    required: true
  },
  estadoMarcaId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'EstadoMarca',
    },
  ],
  esCliente: {
    type: Boolean,
    
  }, 
  tipoRegistro:{
    type: String  , 
    enum: [
    'Local',
    'Local extranjero', 
    'Extranjero local', 
    'Internacional ' ],
  },
  countryDelSignoId: {
    type: mongoose.SchemaTypes.ObjectId,      
    ref: 'Country',
  },
  countryDelRegistroId: {
    type: mongoose.SchemaTypes.ObjectId,      
    ref: 'Country',
  },
  countryDelSolicitanteId: {
    type: mongoose.SchemaTypes.ObjectId,      
    ref: 'Country',
  },
  corresponsal: {
    type: String,
  },    
  userResponsableId: {
    type: mongoose.SchemaTypes.ObjectId,      
    ref: 'User',
  },
  
  claseInternacionalId: {
    type: mongoose.SchemaTypes.ObjectId,      
    ref: 'ClaseInternacional',
  },
  nizaClassId: {
    type: mongoose.SchemaTypes.ObjectId,      
    //type: Schema.ObjectId,      
    ref: 'NizaClass',
  },
  tipoNaturalezaDelSigno : {
    type: String,
    enum: [
    'Denominativo',
    'Figurativo',
    'Mixto',
    'Tridimensional',
    'Sonoro',
    'Olfativo',
    'Táctil' ],
  },
  titular: {
    type: String,
    required: true
  },   
  listaProductoServicio: {
    type: String,							
  },
  numeroSolicitud: {
    type: String,

  },
  fechaSolicitud: {
    type: Date, default: Date.now()
  },
  fechaTitulo: {
    type: Date, default: Date.now()
  },		   
  gacetaId: {
    type: mongoose.SchemaTypes.ObjectId,      
    ref: 'Gaceta',
  },
  fechaVencimientoGaceta: {
    type: Date, 
  },
  recordarFechaVencimientoGaceta: {
    type: Boolean,
  },
  numeroResolucion: {
    type: Number
  },
  fechaResolucion: {
    type: Date, //default: Date.now()
  },
  fechaVencimientoResolucion: {
    type: Date, //default: Date.now()
  },
  numeroTitulo: {
    type: Number,
    // required: true,
    // integer: true,
    // validate: {
    //   validator: function(v) {
    //       return /\ d{10}/.test(v);
    //   },
    //   message: '{VALUE} no es un número entero válido de 10 dígitos!'
    // },
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
//const Other = mongoose.model('Other', OtherSchema);


module.exports = { MarcaSchema, Marca  };
//module.exports = { OtherSchema, Other };
  
