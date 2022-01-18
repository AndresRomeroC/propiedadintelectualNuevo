const mongoose = require('mongoose');

const EstadoMarcaSchema = new mongoose.Schema({
    nombreEstado: {
    type: String, 
    required: true,     
    enum: [
    "En trámite",
    "No presentada",
    "Publicada",
    "Pago de tasa de registro",
    "Registrada",
    "Renovada",
    "No renovar",
    "Transferida",
    "Vencida",
    "Desistida",
    "Cancelada",
    "Anulada",
    "Negada",
    "Inactiva",
    "Suspendida",
    "Abandono",
    "Oposición",
    "Concedida",
    "Recurso de Reposición",
    "Recurso de Revisión",
    "Caducidad del trámite",
    "Caducidad del trámite de renovación",
    "En proceso de cambio de nombre",
    "En proceso de transferencia",
    "En proceso de renovación",
    "En proceso de cancelación",
    "Recurso de reposición"  ],
    default: "En trámite",
  },
  fechaCreacion: {
    type: Date, default: Date.now()
  },
  });

const EstadoMarca = mongoose.model('EstadoMarca', EstadoMarcaSchema);


module.exports = { EstadoMarcaSchema, EstadoMarca  };

  
