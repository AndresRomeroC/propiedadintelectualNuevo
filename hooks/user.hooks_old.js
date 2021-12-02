const argon2 = require('argon2');
const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');

const beforeHookPassword = async (request, context) => {
  if (request.method == 'post') {
    const { password, ...otherParams } = request.payload;

    if (password) {
      const hashPassword = await argon2.hash(password);

      return {
        ...request,
        payload: {
          ...otherParams,
          encryptedPassword: hashPassword,
        },
      };
    }

    return request;
  }
};

const afterHookPassword = async (response, context) => {
  if (response.record && response.record.errors) {
    response.record.errors.password = response.record.errors.encryptedPassword;
  }
  return response;
};

const afterHookUpload = async (response, context) => {
  const { record, avatar } = context;
  if (avatar) {
    await rimraf.sync(record.params.avatar.substring(1));

    const filePath = path.join('uploads', record.id().toString(), avatar.name);

    await fs.promises.mkdir(path.dirname(filePath), { recursive: true });

    await fs.promises.rename(avatar.path, filePath);

    await record.update({ avatar: `/${filePath}` });

    await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
  }
  return response;
};

const beforeHookUpload = async (request, context) => {
  if (request.method === 'post') {
    const { avatar, ...otherParams } = request.payload;

    context.avatar = avatar;

    return {
      ...request,
      payload: otherParams,
    };
  }
  return request;
};
module.exports = { beforeHookPassword, afterHookPassword, beforeHookUpload, afterHookUpload };
