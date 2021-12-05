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
//const { ValidationError } = require ('./validation/ValidationError');

const { ValidationError } = require ('admin-bro');

const onlyAdmin = ({ currentAdmin }) => currentAdmin && currentAdmin.Role === 'admin';

const { beforeHookPassword, afterHookPassword, beforeHookUpload, afterHookUpload, afterNewHookUpload} = require('../../hooks/gaceta.hooks');
const { default: adminBro } = require('admin-bro');




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
    existeGaceta: {
      type: Number,
      isVisible: false,
    },

    UploadDate: {
      type: 'date',
      isVisible: {
        list: true, edit: false, filter: true, show: true,
      },
    },
    
    profileExcelLocation: {
      components: {
        new: AdminBro.bundle('../../components/Gaceta/ProfileExcelLocation.edit.jsx'),
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
  
          // console.log("XXXXXXXXXXXXXXXXXXXXXXXXXX actions - INICIO beforeHookPassword : existeGaceta 1");
          // console.log(modifiedRequest.payload.existeGaceta)
           console.log("XXXXXXXXXXXXXXXXXXXXXXXXXX actions - context.params");
           console.log(context.params)
           console.log("XXXXXXXXXXXXXXXXXXXXXXXXXX actions - context.params");
         
            if (modifiedRequest.payload.existeGaceta ){
                  if (modifiedRequest.payload.existeGaceta.NumberId) {
                throw new AdminBro.ValidationError({
                  name: {
                    message: 'Error al Guardar Gaceta Nueva',
                  },
                }, {
                  message: `Gaceta número ${modifiedRequest.payload.existeGaceta.NumberId} ya existe, genere un nuevo número`,
                })
              }
            }
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
