    // { 
    //   resource: Gaceta,
    //   options: { 
    //     navigation: PropiedadIntelectualNav,
    //     properties: {
    //       UploadDate: {
    //         type: 'date',
    //         isVisible: {
    //           list: true, edit: false, filter: true, show: true,
    //         },
    //       },
    //     },
    //     actions: {
    //       edit: { isAccessible: onlyAdmin },
    //       delete: { isAccessible: onlyAdmin },
    //       new: { isAccessible: onlyAdmin },
    //     }
    //   } 
    // },


const { Gaceta } = require('./gaceta.entity');
const onlyAdmin = ({ currentAdmin }) => currentAdmin && currentAdmin.Role === 'admin';

const PropiedadIntelectualNav = {
    name: 'Propiedad Intelectual',
    icon: 'Password',
  };

  
/** @type {AdminBro.ResourceOptions} */
const options = {

  navigation: PropiedadIntelectualNav, 
  properties: {
    
    profileExcelLocation: {
      isVisible: true,
    },
    UploadDate: {
      type: 'date',
      isVisible: {
        list: true, edit: false, filter: true, show: true,
      },
    },
  },
  actions: {
      edit: { isAccessible: onlyAdmin },
      delete: { isAccessible: onlyAdmin },
      new: { isAccessible: onlyAdmin },
  },
  listProperties: ['NumberId', 'Year', 'Month',
  'Quincena','UploadDate','PublicationDate'],
};

module.exports = {
    options,
    resource: Gaceta,
  }
