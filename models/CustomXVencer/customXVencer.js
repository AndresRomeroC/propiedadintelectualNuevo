


const AdminBro = require('admin-bro');



const customXvencer = {
    label: "Custom page X vencer",
    handler: async (request, response, context) => {
      //const modifiedRequestCustom = await handlerHookCustom(request, context, response);
      return {
        text: 'I am fetched from the backend',
      }
    },
    component: AdminBro.bundle('../../components/some-stats2'),
  };



  module.exports = {
    customXvencer    
  }