 
const { MarcaEnOposicion } = require('../MarcaEnOposicion/marcaEnOposicion.entity');
const onlyAdmin = ({ currentAdmin }) => currentAdmin && currentAdmin.Role === 'admin';
const AdminJS         = require('adminjs');

const PropiedadIntelectualNav2 = {
  name: 'Métricas',
  //icon: 'Password',
  icon:'Apps',
};

const options = {
  navigation: PropiedadIntelectualNav2,  
  new: { 
    isDisabled: true,
  },
  properties: {
    // properties: {
    //   tipoEstados: { isVisible: { list: true, show: true, edit: true, filter: true } },
    // }, 
    // content: {
    //   components: {
    //     //list: AdminJS.bundle('./city-content-in-list')
    //     list: AdminJS.bundle('./Avatare-edit')
    //   }
    // }
  },
  listProperties: [ 'marcaEnOposicion'],
  actions: {
    edit: { 
      isDisabled: true,
    },
    new: { 
      isDisabled: true,
      isVisible: false,
    },
  }

};

module.exports = {
    options,
    resource: MarcaEnOposicion,
  }
//module.exports = options;