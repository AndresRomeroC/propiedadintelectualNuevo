 
const { MarcaPorVencer } = require('../MarcaPorVencer/marcaPorVencer.entity');
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
  listProperties: ['marcaPorVencerMeses', 'cantidadPorVencerMeses','fechaPorVencer'],
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
    resource: MarcaPorVencer,
  }
//module.exports = options;