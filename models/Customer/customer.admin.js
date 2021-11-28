// { 
//     resource: Customer,
//     options: { 
//       navigation: PropiedadIntelectualNav,
//       properties: {
//         CreatedDate: {
//           type: 'date',
//           isVisible: {
//             list: true, edit: false, filter: true, show: true,
//           },
//         },
//       },
//       actions: {
//         edit: { isAccessible: onlyAdmin },
//         delete: { isAccessible: onlyAdmin },
//         new: { isAccessible: onlyAdmin },
//       },
//       listProperties: ['Name', 'TypeOfPerson', 'TypeOfContact', 'Email'] 
//     } 
//   },

const { Customer } = require('./customer.entity');
const onlyAdmin = ({ currentAdmin }) => currentAdmin && currentAdmin.Role === 'admin';

const PropiedadIntelectualNav = {
    name: 'Propiedad Intelectual',
    icon: 'Password',
  };

const options = {
    navigation: PropiedadIntelectualNav,
    properties: {
        CreatedDate: {
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
    listProperties: ['Name', 'TypeOfPerson', 'TypeOfContact', 'Email'] 
};

module.exports = {
    options,
    resource: Customer,
  }