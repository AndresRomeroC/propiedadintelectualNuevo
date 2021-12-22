//{ 
//   resource: Marca,
//   options: { 
//     navigation: PropiedadIntelectualNav,
//     properties: {

//     },
//     actions: {
//       edit: { isAccessible: onlyAdmin },
//       delete: { isAccessible: onlyAdmin },
//       new: { isAccessible: onlyAdmin },
//     },
//     listProperties: ['Titular', 'DenominacionCompleta', 'ClaseInternacional',
//                      'FechaSolicitud','NumeroSolicitud','FechaTitulo','NumeroTitulo','NumberIdGaceta'] 
//   } 
// },
const AdminBro = require('admin-bro');
const { Marca } = require('./marca.entity');
const onlyAdmin = ({ currentAdmin }) => currentAdmin && currentAdmin.Role === 'admin';

const { beforeHookPassword, afterHookPassword, beforeHookUpload, afterHookUpload, afterNewHookUpload, afterDeleteHookUpload} = require('../../hooks/marca.hooks');

const PropiedadIntelectualNav = {
    name: 'Propiedad Intelectual',
    icon: 'Password',
  };

  const options = {

    navigation: PropiedadIntelectualNav,  
    required: [ 'titular'],
    properties: {
      _id: {
        isVisible: {
          list: false, edit: false, filter: false, show: false,
        },
      },
  
      fechaCreacion: {
        isVisible: {
          list: false, edit: false, filter: false, show: false,
        },
      },
      marcaConSimilitudExacta: {
        isDisabled: true,
      },
      marcaConSimilitudMedia: {
        isDisabled: true,
      },
      documentoAdjunto: {
        components: {
          new: AdminBro.bundle('../../components/Marca/DocumentoAdjunto.edit.jsx'),
          edit: AdminBro.bundle('../../components/Marca/DocumentoAdjunto.edit.jsx'),
          list: AdminBro.bundle('../../components/Marca/DocumentoAdjunto.list.jsx'),
          show: AdminBro.bundle('../../components/Marca/DocumentoAdjunto.list.jsx'),
        },
      },
    },
    sort: {
      sortBy : 'fechaCreacion',
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
        new: { 
          isAccessible: onlyAdmin,
          before: async (request, context) => {


            // console.log('=============== before - modifiedRequest - INICIO DE request DE beforeHookUpload');
            // console.log(request);
            //  console.log('=============== before FIN DE request DE beforeHookUpload');


            const modifiedRequest = await beforeHookPassword(request, context);
    
            

            return beforeHookUpload(request, context, modifiedRequest);
          },
          after: async (response, request, context) => {
          const modifiedResponse = await afterHookPassword(response, context);
  
          return afterNewHookUpload(response, context, modifiedResponse);
          },
        },
        delete: { 
          isAccessible: onlyAdmin,

          after: async (response, request, context) => {
            const modifiedResponse = await afterHookPassword(response, context);
    
            return afterDeleteHookUpload(response, context, modifiedResponse);
            },
        },


    },
    //showProperties, editProperties and filterProperties.
    listProperties: ['titular','esCliente', 'denominacionCompleta', 'claseInternacionalId',
    'fechaSolicitud','numeroSolicitud','fechaTitulo','numeroTitulo','gacetaId'],
  
  };

module.exports = {
    options,
    resource: Marca,
  }
//module.exports = options;