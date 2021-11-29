//{ 
//   resource: Marca,
//   options: { 
//     navigation: PropiedadIntelectualNav,
//     properties: {

//     },
//     actions: {
//       edit: { isAccessible: onlyAdmin },
//       delete: { isAccessible: onlyAdmin },
//       new: { isAccessible: onlyAdmin },
//     },
//     listProperties: ['Titular', 'DenominacionCompleta', 'ClaseInternacional',
//                      'FechaSolicitud','NumeroSolicitud','FechaTitulo','NumeroTitulo','NumberIdGaceta'] 
//   } 
// },
    
const { Marca } = require('./marca.entity');
const onlyAdmin = ({ currentAdmin }) => currentAdmin && currentAdmin.Role === 'admin';

const PropiedadIntelectualNav = {
    name: 'Propiedad Intelectual',
    icon: 'Password',
  };

const options = {

  navigation: PropiedadIntelectualNav,
  // properties: {
  //   tipoEstados: { isVisible: { list: true, show: false, edit: true, filter: true } },
  // }, 
  actions: {
      edit: { isAccessible: onlyAdmin },
      delete: { isAccessible: onlyAdmin },
      new: { isAccessible: onlyAdmin },
  },
  listProperties: ['titular', 'denominacionCompleta', 'claseInternacionalId',
  'fechaSolicitud','numeroSolicitud','fechaTitulo','numeroTitulo','gacetaId'],

};

module.exports = {
    options,
    resource: Marca,
  }
//module.exports = options;