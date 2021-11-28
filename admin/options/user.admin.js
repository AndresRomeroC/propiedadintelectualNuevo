// {
//     resource: User,
//     options: {
//       navigation: UsuariosNav,
//       properties: {
//         encryptedPassword: {
//           isVisible: false,
//         },
//         password: {
//           type: 'string',
//           isVisible: {
//             list: false, edit: true, filter: false, show: false,
//           },
//         },
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
//         new: {
//           isAccessible: onlyAdmin,
//           before: async (request) => {
//             if(request.payload.password) {
//               request.payload = {
//                 ...request.payload,
//                 encryptedPassword: await bcrypt.hash(request.payload.password, 10),
//                 password: undefined,
//               }
//             }
//             return request
//           },
//         }
//       }
//     },
    
// },

const AdminBro = require('admin-bro');
const { beforeHookPassword, afterHookPassword } = require('../../hooks/user.hooks');
const { beforeHookUpload, afterHookUpload } = require('../../hooks/user.hooks');

const  User  = require('../../models/User/user.entity');
//const onlyAdmin = ({ currentAdmin }) => currentAdmin && currentAdmin.Role === 'admin';

const UsuariosNav = {
    name: 'Usuarios',
    icon: 'UserMultiple',
  };

const optionUser = {

    navigation: UsuariosNav,
    properties: {
        encryptedPassword: { isVisible: false },
        password: {
          type: 'password',
        },
        avatar: {
          components: {
            edit: AdminBro.bundle('../../components/User/Avatar.edit.jsx'),
            //list: AdminBro.bundle('../../components/User/Avatar.list.jsx'),
           // show: AdminBro.bundle('../../components/User/Avatar.list.jsx'),
          },
        },
        password: {
            type: 'string',
            isVisible: {
                list: false, edit: true, filter: false, show: false,
            },
        },
        CreatedDate: {
            type: 'date',
            isVisible: {
                list: true, edit: false, filter: true, show: true,
            },
        },
    },
    // actions: {
    //     new: {
    //       before: async (request, context) => {
    //         const modifiedRequest = await beforeHookPassword(request, context);
    
    //         return beforeHookUpload(request, context, modifiedRequest);
    //       },
    //       after: async (response, request, context) => {
    //         const modifiedResponse = await afterHookPassword(response, context);
    
    //         return afterHookUpload(response, context, modifiedResponse);
    //       },
    //     },
    //     edit: {
    //       before: async (request, context) => {
    //         const modifiedRequest = await beforeHookPassword(request, context);
    
    //         return beforeHookUpload(request, context, modifiedRequest);
    //       },
    //       after: async (response, request, context) => {
    //         const modifiedResponse = await afterHookPassword(response, context);
    
    //         return afterHookUpload(response, context, modifiedResponse);
    //       },
    //     },
    //   },

      /////////////////////////
    // actions: {
    //     edit: { isAccessible: onlyAdmin },
    //     delete: { isAccessible: onlyAdmin },
    //     new: {
    //     isAccessible: onlyAdmin,
    //     before: async (request) => {
    //         if(request.payload.password) {
    //         request.payload = {
    //             ...request.payload,
    //             encryptedPassword: await bcrypt.hash(request.payload.password, 10),
    //             password: undefined,
    //         }
    //         }
    //         return request
    //     },
    //     }
    // }
    listProperties: ['Name','Email','Role'],
    
};

module.exports = {
    options: optionUser,
    resource: User,
  }
//module.exports = options;