 
const { Marca } = require('../Marca/marca.entity');
const onlyAdmin = ({ currentAdmin }) => currentAdmin && currentAdmin.Role === 'admin';
const AdminBro         = require('admin-bro');


const options = {
  properties: {
    // properties: {
    //   tipoEstados: { isVisible: { list: true, show: true, edit: true, filter: true } },
    // }, 
    // content: {
    //   components: {
    //     //list: AdminBro.bundle('./city-content-in-list')
    //     list: AdminBro.bundle('./Avatare-edit')
    //   }
    // }
  },
  listProperties: ['titular', 'denominacionCompleta', 'claseInternacionalId',
  'fechaSolicitud','numeroSolicitud','fechaTitulo','numeroTitulo','gacetaId','tipoEstados'],
};

module.exports = {
    options,
    resource: Marca,
  }
//module.exports = options;