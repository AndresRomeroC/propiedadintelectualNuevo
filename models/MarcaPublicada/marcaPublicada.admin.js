 
const { MarcaPublicada } = require('../MarcaPublicada/marcaPublicada.entity');
const onlyAdmin = ({ currentAdmin }) => currentAdmin && currentAdmin.Role === 'admin';
const AdminBro         = require('admin-bro');

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
    //     //list: AdminBro.bundle('./city-content-in-list')
    //     list: AdminBro.bundle('./Avatare-edit')
    //   }
    // }
  },
  listProperties: ['tipoEstado', 'marcaPublicada'],
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
    resource: MarcaPublicada,
  }
//module.exports = options;