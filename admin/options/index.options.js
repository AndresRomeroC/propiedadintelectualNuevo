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

const MarcaConResolucion     = require('../../models/MarcaConResolucion/marcaConResolucion.admin');
const MarcaEnOposicion     = require('../../models/MarcaEnOposicion/marcaEnOposicion.admin');
const MarcaEnRenovacion     = require('../../models/MarcaEnRenovacion/marcaEnRenovacion.admin');
const MarcaProcesoCambioNombre     = require('../../models/MarcaProcesoCambioNombre/marcaProcesoCambioNombre.admin');
const MarcaProcesoLicenciada     = require('../../models/MarcaProcesoLicenciada/marcaProcesoLicenciada.admin');
const MarcaPublicada     = require('../../models/MarcaPublicada/marcaPublicada.admin');
const MarcaSinPublicar     = require('../../models/MarcaSinPublicar/marcaSinPublicar.admin');
const MarcaProcesoTransferencia     = require('../../models/MarcaProcesoTransferencia/marcaProcesoTransferencia.admin');
const EstadoMarca    = require('../../models/EstadoMarca/estadoMarca.admin');

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
    MarcaPorVencer,
    MarcaConResolucion,
    MarcaEnRenovacion,
    MarcaEnOposicion,
    MarcaProcesoLicenciada,  
    MarcaProcesoCambioNombre,
    MarcaPublicada,
    MarcaSinPublicar,
    MarcaProcesoTransferencia,
    EstadoMarca,
  ],
  dashboard: {
  
  
   handler: async () => {
    
   // req.session.redirectTo = './admin/resources/MarcaPorVencer'
   // res.redirect('./admin/resources/MarcaPorVencer')
   // component: AdminBro.bundle(redirect('./admin/resources/MarcaPorVencer'))
  //  // return (<Redirect to="/route/to/redirect" />);
  //   //return { redirectTo: './admin/resources/MarcaPorVencer' }
    
  //return res
     return { some: 'output' }
  //res.redirect('/admin/resources/MarcaPorVencer')
    // app.get('/',function(req,res){
    //   // On getting the home route request,
    //   // the user will be redirected to GFG website
    //   res.redirect('https://www.geeksforgeeks.org');
    // });
  },
  component: AdminBro.bundle('../../components/some-stats'),
  //component: AdminBro.bundle(redirect('./admin/resources/MarcaPorVencer'))
  //redirectUrl : './admin/resources/MarcaPorVencer'
  
  //component: AdminBro.bundle('./admin/resources/MarcaPorVencer'),
  //component : MarcaPorVencer,
},
  branding: {
    companyName: 'Lexvalor - Propiedad Intelectual',
    //theme,
    softwareBrothers: false,
    logo: "/logo-lexvalor6.png"
  
  },
  
  locale : {translations}
};

module.exports = AdminBroOptions    ;
