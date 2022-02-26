//const AdminJS         = require('adminjs');
//const expressAdminJS  =  require('@adminjs/express');
//const mongooseAdminJS = require('@adminjs/mongoose');
//const AdminJSOptions  = require('../admin.options');
const bcrypt           = require('bcrypt');

const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express');
const AdminJSMongoose = require('@adminjs/mongoose');
//const argon2 = require('argon2');

AdminJS.registerAdapter(AdminJSMongoose);

const  User       = require('../../models/User/user.entity');


const buildAdminRouter = (admin) => {
    const router = AdminJSExpress.buildAuthenticatedRouter(
      admin, 
      {
        cookieName: 'adminjs',
        cookiePassword: 'superlongandcomplicatedname',
        authenticate: async (email, password) => {
        try {
          
          const user = await User.findOne({ email }); 
          
          if (user) {
              const matched = await bcrypt.compare(password, user.encryptedPassword)
              if (matched) {
                console.log(matched);
                //return true
                return user//.toJSON()
              }
          }
          // if (user && (await argon2.verify(user.encryptedPassword, password))) {
          //     return user.toJSON();
          // }
          // true si la clave y contraseña es correcta, false si existe error
          return false;
          
        } catch (err) {
          console.log(err);
        }
      },
    },
    null,
    {
      resave: false,
      saveUninitialized: true,      
    }
  );

return router;
};


  module.exports = buildAdminRouter