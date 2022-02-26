


const AdminJS = require('adminjs');



const customXvencer = {
    label: "Custom page X vencer",
    handler: async (request, response, context) => {
      //const modifiedRequestCustom = await handlerHookCustom(request, context, response);
      return {
        text: 'I am fetched from the backend',
      }
    },
    component: AdminJS.bundle('../../components/some-stats2'),
  };



  module.exports = {
    customXvencer    
  }