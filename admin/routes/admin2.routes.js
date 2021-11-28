const AdminBro = require('admin-bro');
const AdminBroExpress = require('@admin-bro/express');
const AdminBroMongoose = require('@admin-bro/mongoose');
const argon2 = require('argon2');

AdminBro.registerAdapter(AdminBroMongoose);

const User = require('../../models/user');

const buildAdminRouter = (admin) => {
  const router = AdminBroExpress.buildAuthenticatedRouter(
    admin,
    {
      cookieName: 'adminBro',
      cookiePassword: 'luandev',
      authenticate: async (email, password) => {
        const user = await User.findOne({ email });

        if (user && (await argon2.verify(user.encryptedPassword, password))) {
          return user.toJSON();
        }
        return true;
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

module.exports = buildAdminRouter;
