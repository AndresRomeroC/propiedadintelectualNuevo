const argon2 = require('argon2');
const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');
const XLSX  = require('xlsx');

//const  Postal       = require('../models/post');



const afterHookUpload = async (response, context) => {
  
  //console.log(response);
  //console.log(context);
  
  const { record, profileExcelLocation } = context;
  if (profileExcelLocation) {
    
    //await rimraf.sync(record.params.avatar.substring(0));

    const filePath = path.join('uploads', record.id().toString(), profileExcelLocation.name);
    console.log(filePath);

    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx console.log(record.id().toString()); ");
    console.log(record.id().toString());
    
    await fs.promises.mkdir(path.dirname(filePath), { recursive: true });

    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx avatar.path ");
    console.log(profileExcelLocation.path);
    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx path ");
    console.log(path);
    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx path.dirname ");
    console.log(path.dirname(filePath));
    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx filePath ");
    console.log(filePath);
    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx path.dirname ");
    


    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx rename ");
    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx rename ");
    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx rename ");

    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx rename ");
    //await fs.promises.rename(avatar.path, filePath);
    //await fs.promises.rename(avatar.path, filePath);

    
    fs.copyFile(profileExcelLocation.path, filePath, function (err) {
      if (err) throw err;
    });

    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx rename 2 : filePath");
    

    await record.update({ profileExcelLocation: `/${filePath}` });



    await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
    //const unNombre = await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
    //console.log(unNombre);

    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx pathExcel comienza");
    
    //Obtener la ruta :
    //D:\adminbro\propiedadintelectualNuevo
     const pathExcel = `D:\\adminbro\\propiedadintelectualNuevo\\${filePath}`;
    
     console.log(pathExcel);
     const workbook = XLSX.readFile(pathExcel);
    console.log(workbook.Strings[2])
     var nombreHoja = workbook.SheetNames;
     console.log(nombreHoja)
     let datos = XLSX.utils.sheet_to_json(workbook.Sheets[nombreHoja[0]]);
     console.log(datos);



    //const postal = await post.insertMany(record.params.post)

    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx pathExcel termina");





    
  }
  return response;
};

const beforeHookUpload = async (request, context) => {
  if (request.method === 'post') {
    const { profileExcelLocation, ...otherParams } = request.payload;

    context.profileExcelLocation = profileExcelLocation;

    return {
      ...request,
      payload: otherParams,
    };
  }
  return request;
};


////////////////////
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

module.exports = { beforeHookPassword, afterHookPassword, beforeHookUpload, afterHookUpload };
