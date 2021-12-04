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

    const AdminBro = require('admin-bro');
const { Gaceta } = require('./gaceta.entity');
const onlyAdmin = ({ currentAdmin }) => currentAdmin && currentAdmin.Role === 'admin';

const { beforeHookPassword, afterHookPassword, beforeHookUpload, afterHookUpload, afterNewHookUpload} = require('../../hooks/gaceta.hooks');




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
    
    profileExcelLocation: {
      components: {
        //edit: AdminBro.bundle('../../components/User/holaMundo.jsx'),
        edit: AdminBro.bundle('../../components/Gaceta/ProfileExcelLocation.edit.jsx'),
        list: AdminBro.bundle('../../components/Gaceta/Avatar.list.jsx'),
        show: AdminBro.bundle('../../components/Gaceta/Avatar.list.jsx'),
      },
    },
  },
  sort: {
    sortBy : 'NumberId',
    direction: 'desc',
  },
  actions: {
      edit: { 
        isAccessible: onlyAdmin,
        
        before: async (request, context) => {
          const modifiedRequest = await beforeHookPassword(request, context);
  
          return beforeHookUpload(request, context, modifiedRequest);
        },
        after: async (response, request, context) => {
        const modifiedResponse = await afterHookPassword(response, context);

        return afterHookUpload(response, context, modifiedResponse);
        },
      },
      delete: { isAccessible: onlyAdmin },
      new: { 
        isAccessible: onlyAdmin ,
        before: async (request, context) => {
          const modifiedRequest = await beforeHookPassword(request, context);
  
          return beforeHookUpload(request, context, modifiedRequest);
        },
        after: async (response, request, context) => {
        const modifiedResponse = await afterHookPassword(response, context);

        return afterNewHookUpload(response, context, modifiedResponse);
        },
       },
  },
  listProperties: ['NumberId', 'Year', 'Month',
  'Quincena','UploadDate','PublicationDate'],
};

module.exports = {
    options,
    resource: Gaceta,
  }
