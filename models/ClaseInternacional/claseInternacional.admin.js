// {
// resource: ClaseInternacional,

// options: { 
//     navigation: BasicosNav,
//     actions: {
//     edit: { isAccessible: onlyAdmin },
//     delete: { isAccessible: onlyAdmin },
//     new: { isAccessible: onlyAdmin },
//     }
// }
// },


const { ClaseInternacional } = require('./claseInternacional.entity');
const onlyAdmin = ({ currentAdmin }) => currentAdmin && currentAdmin.Role === 'admin';

const BasicosNav = {
    name: 'Básicos',
    icon: 'Report',
  };

const options = {

  navigation: BasicosNav, 
  properties: {
    _id: {
        isVisible: {
        list: false, edit: false, filter: false, show: false,
        },
    },
  },
  actions: {
      edit: { isAccessible: onlyAdmin },
      delete: { isAccessible: onlyAdmin },
      new: { isAccessible: onlyAdmin },
    },
    listProperties: ['classInt', 'descriptionClassInt', 'typeClassInt'] 

};

module.exports = {
    options,
    resource: ClaseInternacional,
  }