 
const { EstadoMarca } = require('../EstadoMarca/estadoMarca.entity');
const onlyAdmin = ({ currentAdmin }) => currentAdmin && currentAdmin.Role === 'admin';
const AdminJS         = require('adminjs');

const BasicosNav = {
    name: 'Básicos',
    icon: 'Report',
  };
const options = {
  navigation: BasicosNav,  
//   new: { 
//     isDisabled: true,
//   },
properties: {
     
    fechaCreacion: { isVisible: { list: true, show: true, edit: true, filter: true } ,
                        isDisabled: {  edit: true } ,
                    },

    // content: {
    //   components: {
    //     //list: AdminJS.bundle('./city-content-in-list')
    //     list: AdminJS.bundle('./Avatare-edit')
    //   }
    // }
  },
  listProperties: ['nombreEstado','fechaCreacion'],
  actions: {
    // edit: { 
    //   isDisabled: true,
    // },
    // new: { 
    //   isDisabled: true,
    //   isVisible: false,
    // },
  }

};

module.exports = {
    options,
    resource: EstadoMarca,
  }
//module.exports = options;