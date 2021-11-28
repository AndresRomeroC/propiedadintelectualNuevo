// {
// resource: Country,  
// options: { 
//     navigation: BasicosNav,
//     properties: {
//     CreatedDate: {
//         type: 'date',
//         isVisible: {
//         list: true, edit: false, filter: true, show: true,
//         },
//     },
//     },
//     actions: {
//     edit: { isAccessible: onlyAdmin },
//     delete: { isAccessible: onlyAdmin },
//     new: { isAccessible: onlyAdmin },
//     },
//     listProperties: ['Name', 'CodeISO', 'Zone'] 
// }
// },

  const { Country } = require('./country.entity');
const onlyAdmin = ({ currentAdmin }) => currentAdmin && currentAdmin.Role === 'admin';

const BasicosNav = {
    name: 'Básicos',
    icon: 'Report',
  };

const options = {
    navigation: BasicosNav,
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
    listProperties: ['Name', 'CodeISO', 'Zone'] 
};

module.exports = {
    options,
    resource: Country,
  }