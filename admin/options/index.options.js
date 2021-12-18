const { default: AdminBro } = require('admin-bro');
const mongooseAdminBro = require('@admin-bro/mongoose');
const translations     =  require('../../src/locale/es-translation.ts');
const mongoose = require('mongoose');


//Models
//const UserM      = require('../../models/User/user.entity');
const UserA      = require('./user.admin');
const Marca     = require('../../models/Marca/marca.admin');
//const MisMarcas     = require('../../models/MisMarcas/mismarcas.admin');
const Gaceta    = require('../../models/Gaceta/gaceta.admin');
const Country   = require('../../models/Country/country.admin');
const Customer  = require('../../models/Customer/customer.admin');
const NizaClass = require('../../models/NizaClass/nizaClass.admin');
const ClaseInternacional     = require('../../models/ClaseInternacional/claseInternacional.admin');
const MarcaPorVencer     = require('../../models/MarcaPorVencer/marcaPorVencer.admin');
//const CustomXVencer     = require('../../models/CustomXVencer/customXVencer');

// const PropiedadIntelectualNav = {
//   name: 'Propiedad Intelectual',
//   icon: 'Password',
// }

  const UsuariosNav = {
    name: 'Usuarios',
    icon: 'UserMultiple',
  }

// const BasicosNav = {
//   name: 'Básicos',
//   icon: 'Report',
// }

//const { authenticationClosure } = require('./auth')

// const authenticate = authenticationClosure({
//   UserM
// })

const onlyAdmin = ({ currentAdmin }) => currentAdmin && currentAdmin.Role === 'admin';

AdminBro.registerAdapter(mongooseAdminBro);
const AdminBroOptions = {
  //currentAdmin,
  databases: [mongoose],
  //rootPath: '/adminPropiedad',
  //loginPath: '/adminPropiedad/login',
  //logoutPath: '/adminPropiedad/logout',
  pages: {
    // customPage: {
    //   label: "Home",
    //   handler: async (request, response, context) => {
    //     //const modifiedRequestCustom = await handlerHookCustom(request, context, response);
    //     return {
    //       text: 'I am fetched from the backend',
    //     }
    //   },
    //   component: AdminBro.bundle('../../components/some-stats'),
    // },
    Home: {
      label: "Home1",
      component: AdminBro.bundle('../../components/some-stats'),
     },
  },
  resources: [
    Marca,
    Gaceta,
    ClaseInternacional, 
    Customer,
    Country,
    NizaClass,
    UserA,
    MarcaPorVencer
  //  MisMarcas
  //  {
  //    resource: User,
  //    options: {
  //      navigation: UsuariosNav,
  //      properties: {
  //        encryptedPassword: {
  //          isVisible: false,
  //        },
  //        password: {
  //          type: 'string',
  //          isVisible: {
  //            list: false, edit: true, filter: false, show: false,
  //          },
  //        },
  //        CreatedDate: {
  //          type: 'date',
  //          isVisible: {
  //            list: true, edit: false, filter: true, show: true,
  //          },
  //        },
  //      },
  //      actions: {
  //        edit: { isAccessible: onlyAdmin },
  //        delete: { isAccessible: onlyAdmin },
  //        new: {
  //          isAccessible: onlyAdmin,
  //          before: async (request) => {
  //            if(request.payload.password) {
  //              request.payload = {
  //                ...request.payload,
  //                encryptedPassword: await bcrypt.hash(request.payload.password, 10),
  //                password: undefined,
  //              }
  //            }
  //            return request
  //          },
  //        }
  //      }
  //    },
     // pages: {
     //    customPage: {
     //       label: "Custom page",
     //      handler: async (request, response, context) => {
     //        return {
     //          text: 'I am fetched from the backend',
     //        }
     //      },
     //      component: AdminJS.bundle('./components/some-stats'),
     //    },
    //    anotherPage: {
    //      label: "TypeScript page",
    //      component: AdminJS.bundle('./components/test-component'),
    //    },
    //  },
 // },
],
dashboard: {
  handler: async () => {
    return { some: 'output' }
  },
  component: AdminBro.bundle('../../components/some-stats'),
},
  branding: {
    companyName: 'Lexvalor - Propiedad Intelectual',

    softwareBrothers: false,
    logo: "/logo-lexvalor.png"
  
  },
  
  locale : {translations}
};

module.exports = AdminBroOptions    ;
