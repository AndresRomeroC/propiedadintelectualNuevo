// {
// resource: NizaClass,
    
// options: { 
//     navigation: BasicosNav,
//     actions: {
//     edit: { isAccessible: onlyAdmin },
//     delete: { isAccessible: onlyAdmin },
//     new: { isAccessible: onlyAdmin },
//     }
// }
// },


  
const { NizaClass } = require('./nizaClass.entity');
const onlyAdmin = ({ currentAdmin }) => currentAdmin && currentAdmin.Role === 'admin';

const BasicosNav = {
    name: 'Básicos',
    icon: 'Report',
  };

const options = {

    navigation: BasicosNav,
    actions: {
        edit: { isAccessible: onlyAdmin },
        delete: { isAccessible: onlyAdmin },
        new: { isAccessible: onlyAdmin },
    }


};

module.exports = {
    options,
    resource: NizaClass,
  };