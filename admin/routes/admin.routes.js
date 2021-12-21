//const AdminBro         = require('admin-bro');
//const expressAdminBro  =  require('@admin-bro/express');
//const mongooseAdminBro = require('@admin-bro/mongoose');
//const AdminBroOptions  = require('../admin.options');
const bcrypt           = require('bcrypt');

const AdminBro = require('admin-bro');
const AdminBroExpress = require('@admin-bro/express');
const AdminBroMongoose = require('@admin-bro/mongoose');
//const argon2 = require('argon2');

AdminBro.registerAdapter(AdminBroMongoose);

const  User       = require('../../models/User/user.entity');


const buildAdminRouter = (admin) => {
    const router = AdminBroExpress.buildAuthenticatedRouter(
        admin, 
        {
            cookieName: 'admin-bro',
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
                return true;
                
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