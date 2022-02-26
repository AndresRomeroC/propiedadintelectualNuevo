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

const AdminJS = require('adminjs');
const { Gaceta } = require('./gaceta.entity');
//const { ValidationError } = require ('./validation/ValidationError');

const { ValidationError } = require ('adminjs');

const onlyAdmin = ({ currentAdmin }) => currentAdmin && currentAdmin.Role === 'admin';

const { beforeHookPassword, afterHookPassword, beforeHookUpload, afterHookUpload, 
  afterNewHookUpload, afterDeleteHookUpload, afterBulkDeleteHookUpload, exportarGacetaHookUpload} = require('../../hooks/gaceta.hooks');





const PropiedadIntelectualNav = {
    name: 'Propiedad Intelectual',
    icon: 'Password',
  };

  
/** @type {AdminJS.ResourceOptions} */
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
    
    totalRegistrosImportados: {
      isDisabled: true,
    },
    sinSimilitud: {
      isDisabled: true,
    },
    conSimilitudExacta: {
      isDisabled: true,
    },
    conSimilitudMedia: {
      isDisabled: true,
    },
    UploadDate: {
      type: 'date',
      isVisible: {
        list: true, edit: false, filter: true, show: true,
      },
    },
    profileExcelLocation: {
      components: {
        new: AdminJS.bundle('../../components/Gaceta/ProfileExcelLocation.edit.jsx'),
        edit: AdminJS.bundle('../../components/Gaceta/ProfileExcelLocation.edit.jsx'),
        //list: AdminJS.bundle('../../components/Gaceta/Avatar.list.jsx'),
        //show: AdminJS.bundle('../../components/Gaceta/Avatar.list.jsx'),
      },
    },
  },
  sort: {
    sortBy : 'NumberId',
    direction: 'desc',
  },
  
  actions: {
    exportarGaceta: {
      actionType: 'record',
      icon: 'View',
      isVisible: true,
      // handler: async () => {
      //     return { some: 'output' }
      //  },
      // component: AdminJS.bundle('../../components/some-stats'),
      before: async (request, context) => {
        const modifiedRequest = await beforeHookPassword(request, context);

        return beforeHookUpload(request, context, modifiedRequest);
      },
      handler: async (response, request, context) => {
        const modifiedResponse = await afterHookPassword(response, context);

        return exportarGacetaHookUpload(request, response, context, modifiedResponse);
        },
        component: false,
    },

      bulkDelete : { 
        //1.-opcion deshabilitar
        //isDisabled: true,
        //isVisible: false,

        // Solo hace que ocupe todo el Frame
        //showInDrawer: false,

        
        //guard: 'doYouReallyWantToDoThisGaceta',
        //showInDrawer: false,
       
        // // before: async (request, context) => {
        // //   const modifiedRequest = await beforeHookPassword(request, context);

        // //   return beforeHookUpload(request, context, modifiedRequest);
        // // },
         after: async (response, request, context) => {
         const modifiedResponse = await afterHookPassword(response, context);

         return afterBulkDeleteHookUpload(request, response, context, modifiedResponse);
         },
      },
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
      delete: { 
        isAccessible: onlyAdmin , 
        guard: 'doYouReallyWantToDoThisGaceta',
        before: async (request, context) => {
          const modifiedRequest = await beforeHookPassword(request, context);

          return beforeHookUpload(request, context, modifiedRequest);
        },
        after: async (response, request, context) => {
        const modifiedResponse = await afterHookPassword(response, context);

        return afterDeleteHookUpload(response, context, modifiedResponse);
        },
      },
      new: { 
        isAccessible: onlyAdmin ,
        before: async (request, context) => {
          const modifiedRequest = await beforeHookPassword(request, context);
  
          // console.log("XXXXXXXXXXXXXXXXXXXXXXXXXX actions - INICIO beforeHookPassword : existeGaceta 1");
          // console.log(modifiedRequest.payload.existeGaceta)
           //console.log("XXXXXXXXXXXXXXXXXXXXXXXXXX actions - context.params");
           //console.log(context.params)
           //console.log("XXXXXXXXXXXXXXXXXXXXXXXXXX actions - context.params");
         
            if (modifiedRequest.payload.existeGaceta ){
                  if (modifiedRequest.payload.existeGaceta.NumberId) {
                throw new AdminJS.ValidationError({
                  name: {
                    message: 'Error al Guardar Gaceta Nueva',
                  },
                }, {
                  message: `Gaceta número ${modifiedRequest.payload.existeGaceta.NumberId} ya existe, genere un nuevo número`,
                })
              }
            }

             //console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx fin request");
             //console.log(request );
             //console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx inicio request");

            if (request.payload.profileExcelLocation == null){
                throw new AdminJS.ValidationError({
                  name: {
                    message: 'Error al Guardar Gaceta Nueva, no existe profileExcelLocation',
                  },
                }, {
                  message: ` Para guardar una Gaceta, debe ingresar el documento de Marcas (.xls)`,
                })
            }else{
              const pathExcel = request.payload.profileExcelLocation.name ;      
              //console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx inicio context.profileExcelLocation.path ");
              //console.log(pathExcel);
              //console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx fin context.profileExcelLocation.path");
              // validar si el documento corresponde a un excel.
              let esDocumentoPermitido = false;
              if(pathExcel){
                //new Array(".gif", ".jpg", ".doc", ".pdf");
                const extensiones_permitidas = new Array(".xlsx");
                //recupero la extensión de este nombre de archivo
                const extension = (pathExcel.substring(pathExcel.lastIndexOf("."))).toLowerCase();
                for (let i = 0; i < extensiones_permitidas.length; i++) {
                  
                  //console.log(extension);
                  if (extensiones_permitidas[i] == extension) {
                    esDocumentoPermitido = true;
                    break;
                  }
                }
                if (!esDocumentoPermitido){
                  throw new AdminJS.ValidationError({
                    name: {
                      message: 'Error al Guardar Gaceta Nueva, No es Extension Permitida',
                    },
                  }, {
                    message: `La extensión del documento no es válida, intente ingresar un documento con extensión (.xls)`,
                  })
              }



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
  ////showProperties, editProperties and filterProperties.
  listProperties: ['NumberId', 'Year', 'Month',
  'Quincena','UploadDate','PublicationDate'],
};

module.exports = {
    options,
    resource: Gaceta,
  }
