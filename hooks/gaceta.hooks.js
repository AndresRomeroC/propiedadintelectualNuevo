const argon2 = require('argon2');
const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');
const XLSX  = require('xlsx');

const  { MarcaSchema, Marca }         = require('../models/Marca/marca.entity');

const  { GacetaSchema, Gaceta }      = require('../models/Gaceta/gaceta.entity');



const afterHookUpload = async (response, context) => {
  

//
  //console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx INICIO response ===== > ");
  //console.log(response);
  //console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx FINresponse ===== > ");
  //console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxXXXXXXXXXXXXXXXXXXXXXXXXXX");


  //console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx INICIO context ===== > ");
  //console.log(context);
  //console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx FIN context ===== > ");
  //console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxXXXXXXXXXXXXXXXXXXXXXXXXXX");
 
  
  const { record, profileExcelLocation } = context;

  //console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx INICIO record ===== > ");
  //console.log(record);
  //console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx FIN record ===== > ");
  //console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxXXXXXXXXXXXXXXXXXXXXXXXXXX");

  if (profileExcelLocation) {
    
    //await rimraf.sync(record.params.avatar.substring(0));

    const filePath = path.join('uploads', record.id().toString(), profileExcelLocation.name);
    console.log(filePath);

    //console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx console.log(record.id().toString()); ===== > ");
    //console.log(record.id().toString());
    
    await fs.promises.mkdir(path.dirname(filePath), { recursive: true });

    //console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx avatar.path ");
    //console.log(profileExcelLocation.path);
    //console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx path ");
    //console.log(path);
    //console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx path.dirname ");
    //console.log(path.dirname(filePath));
    //console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx filePath ");
    //console.log(filePath);
    //console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx path.dirname ");
    //console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx rename ");
    //console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx rename ");
    //console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx rename ");
    //console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx rename ");


    //await fs.promises.rename(avatar.path, filePath);
    //await fs.promises.rename(avatar.path, filePath);

    
    fs.copyFile(profileExcelLocation.path, filePath, function (err) {
      if (err) throw err;
    });

    //console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx rename 2 : filePath");
    

    await record.update({ profileExcelLocation: `/${filePath}` });



    await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
    //const unNombre = await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
    //console.log(unNombre);

    //console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx pathExcel comienza");
    

    // 1.- Validar existencia de Gaceta
    const existeGaceta=  await Gaceta.findOne({ NumberId: record.params.NumberId }).exec();
    //console.log(gacetita);

    if( existeGaceta == null ){
      //ARC :Obtener la ruta :
      //D:\adminbro\propiedadintelectualNuevo
      const pathExcel = `D:\\adminbro\\propiedadintelectualNuevo\\${filePath}`;
      const workbook = XLSX.readFile(pathExcel);
      var nombreHoja = workbook.SheetNames;
      let datos = XLSX.utils.sheet_to_json(workbook.Sheets[nombreHoja[0]]);

      //console.log(workbook.Sheets[nombreHoja[0]]);

      //const jDatos = [];
      for (let i = 0; i < datos.length; i++) {
        
        const dato = datos[i];
        
        const denominacionCompleta = dato.denominacionCompleta;
        const titular = dato.titular;
        const query = { titular, denominacionCompleta};

        //verifica existencia de Marca
        // let existeMarca =   Marca.exists({ titular }, function(err, result) {
        //                         if (err) {
        //                           console.log("Something wrong when updating data!");
        //                         } else {
        //                           console.log(result);
        //                         }
        //                       });



        //let existeMarca =   Marca.where(query);


        console.log(`xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  ${i}`);
        //console.log(existeMarca);

        //  if( existeMarca == null ){
        //      console.log(" entra al else"); 
        //    //Marca.insertMany(dato, function(error, docs) {});

        //    Marca.insertMany(dato).then(function(){
        //      console.log("Data inserted")  // Success
        //    }).catch(function(error){
        //        console.log(error)      // Failure
        //    });
        //  }else{

            Marca.findOneAndUpdate(query, {$set:{tipoEstados:"Caducidad del trámite de renovación"}}, {new: true}, (err, result) => {
              if (err) {
                  console.log("Something wrong when updating data!");
              }
              
              if( result == null ){
                Marca.insertMany(dato).then(function(){
                  console.log("Data inserted")  // Success
                }).catch(function(error){
                    console.log(error)      // Failure
                });
              }
                  console.log(result);
            });
        //}

        // console.log(" salio del if else"); 
        // jDatos.push({
        //   ...dato,
        //   //Fecha: new Date((dato.Fecha - (25567 + 2)) * 86400 * 1000)
        // });
      }
      //console.log(jDatos);
    }

/*

    //BUSCA GACETA POR ID; devuelve un arreglo con el objeto completo
    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  BUSCA GACETA POR ID; devuelve un arreglo con el objeto completo");
    const gacetaDB = await  Gaceta.where({ NumberId: record.params.NumberId });
    console.log(gacetaDB);

    //BUSCA GACETA POR ID; devuelve el objeto completo
    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx BUSCA GACETA POR ID; devuelve el objeto completo");
    // { NumberId: 9999999999 } // devuelve null
    const gacetita=  await Gaceta.findOne({ NumberId: record.params.NumberId }).exec();
    console.log(gacetita);
    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx Fin Gaceta de la DB2");

    // //BUSCA MARCA POR denominacionCompleta, titular y actualiza; 
    const denominacionCompleta = 'DISTRIBUIDORA DE CONBUSTIBLES VIGUESAM Cia Ltda';
    const titular = '  DISTRIDUIDORA DE COMBUSTIBLES VIGUESAM CIA LTDA';
    const query = { titular, denominacionCompleta};
    Marca.findOneAndUpdate(query, {$set:{tipoEstados:"En trámite"}}, {new: true}, (err, doc) => {
      if (err) {
          console.log("Something wrong when updating data!");
      }
          console.log(doc);
    });




  // console.log(result);
    console.log(query);


    // // busca por titular y devuelve denominacion completa.
    // const marcaDB = Marca.findOne({ titular: titular }, { denominacionCompleta: denominacionCompleta } );

    // // si la encuentra actualiza a estado Publicada
    // //Marca.updateOne({ { titular: titular }, { denominacionCompleta: denominacionCompleta } }, { $set: { tipoEstado: 'Publicada' }}); // executed


    

    // //Marca.updateOne({phone:request.phone}, {$set: { phone: request.phone }}, {upsert: true}, function(err){...}



    // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx Marca de la DB");

    // console.log(marcaDB);



    // //const postal = await post.insertMany(record.params.post)

    */
  }
  return response;
};

const afterNewHookUpload = async (response, context) => {
  

  //
    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx INICIO response ===== > ");
    console.log(response);
    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx FINresponse ===== > ");
    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxXXXXXXXXXXXXXXXXXXXXXXXXXX");
  
  
    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx INICIO context ===== > ");
    console.log(context);
    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx FIN context ===== > ");
    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxXXXXXXXXXXXXXXXXXXXXXXXXXX");
   
    
    const { record, profileExcelLocation } = context;
  
    //console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx INICIO record ===== > ");
    //console.log(record);
    //console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx FIN record ===== > ");
    //console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxXXXXXXXXXXXXXXXXXXXXXXXXXX");
  
    if (profileExcelLocation) {
      
      //await rimraf.sync(record.params.avatar.substring(0));
  
      const filePath = path.join('uploads', record.id().toString(), profileExcelLocation.name);
      console.log(filePath);
  
      //console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx console.log(record.id().toString()); ===== > ");
      //console.log(record.id().toString());
      
      await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
  
      //console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx avatar.path ");
      //console.log(profileExcelLocation.path);
      //console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx path ");
      //console.log(path);
      //console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx path.dirname ");
      //console.log(path.dirname(filePath));
      //console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx filePath ");
      //console.log(filePath);
      //console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx path.dirname ");
      //console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx rename ");
      //console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx rename ");
      //console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx rename ");
      //console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx rename ");
  
  
      //await fs.promises.rename(avatar.path, filePath);
      //await fs.promises.rename(avatar.path, filePath);
  
      
      fs.copyFile(profileExcelLocation.path, filePath, function (err) {
        if (err) throw err;
      });
  
      //console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx rename 2 : filePath");
      
  
      await record.update({ profileExcelLocation: `/${filePath}` });
  
  
  
      await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
      //const unNombre = await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
      //console.log(unNombre);
  
      //console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx pathExcel comienza");
      
  
      // 1.- Validar existencia de Gaceta
     // const existeGaceta=  await Gaceta.findOne({ NumberId: record.params.NumberId }).exec();
      console.log(record);
  
     // if( existeGaceta == null ){
        //ARC :Obtener la ruta :
        //D:\adminbro\propiedadintelectualNuevo
        const pathExcel = `D:\\adminbro\\propiedadintelectualNuevo\\${filePath}`;
        const workbook = XLSX.readFile(pathExcel);
        var nombreHoja = workbook.SheetNames;
        let datos = XLSX.utils.sheet_to_json(workbook.Sheets[nombreHoja[0]]);
  
        //console.log(workbook.Sheets[nombreHoja[0]]);
  
        //const jDatos = [];
        for (let i = 0; i < datos.length; i++) {
          
          const dato = datos[i];
          
          const denominacionCompleta = dato.denominacionCompleta;
          const titular = dato.titular;
          const query = { titular, denominacionCompleta};
  
          //verifica existencia de Marca
          // let existeMarca =   Marca.exists({ titular }, function(err, result) {
          //                         if (err) {
          //                           console.log("Something wrong when updating data!");
          //                         } else {
          //                           console.log(result);
          //                         }
          //                       });
  
  
  
          //let existeMarca =   Marca.where(query);
  
  
          console.log(`xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  ${i}`);
          //console.log(existeMarca);
  
          //  if( existeMarca == null ){
          //      console.log(" entra al else"); 
          //    //Marca.insertMany(dato, function(error, docs) {});
  
          //    Marca.insertMany(dato).then(function(){
          //      console.log("Data inserted")  // Success
          //    }).catch(function(error){
          //        console.log(error)      // Failure
          //    });
          //  }else{
  
              Marca.findOneAndUpdate(query, {$set:{tipoEstados:"Caducidad del trámite de renovación"}}, {new: true}, (err, result) => {
                if (err) {
                    console.log("Something wrong when updating data!");
                }
                
                if( result == null ){
                  Marca.insertMany(dato).then(function(){
                    console.log("Data inserted")  // Success
                  }).catch(function(error){
                      console.log(error)      // Failure
                  });
                }
                    console.log(result);
              });
          //}
  
          // console.log(" salio del if else"); 
          // jDatos.push({
          //   ...dato,
          //   //Fecha: new Date((dato.Fecha - (25567 + 2)) * 86400 * 1000)
          // });
        }
        //console.log(jDatos);
      //}
  
  /*
  
      //BUSCA GACETA POR ID; devuelve un arreglo con el objeto completo
      console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  BUSCA GACETA POR ID; devuelve un arreglo con el objeto completo");
      const gacetaDB = await  Gaceta.where({ NumberId: record.params.NumberId });
      console.log(gacetaDB);
  
      //BUSCA GACETA POR ID; devuelve el objeto completo
      console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx BUSCA GACETA POR ID; devuelve el objeto completo");
      // { NumberId: 9999999999 } // devuelve null
      const gacetita=  await Gaceta.findOne({ NumberId: record.params.NumberId }).exec();
      console.log(gacetita);
      console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx Fin Gaceta de la DB2");
  
      // //BUSCA MARCA POR denominacionCompleta, titular y actualiza; 
      const denominacionCompleta = 'DISTRIBUIDORA DE CONBUSTIBLES VIGUESAM Cia Ltda';
      const titular = '  DISTRIDUIDORA DE COMBUSTIBLES VIGUESAM CIA LTDA';
      const query = { titular, denominacionCompleta};
      Marca.findOneAndUpdate(query, {$set:{tipoEstados:"En trámite"}}, {new: true}, (err, doc) => {
        if (err) {
            console.log("Something wrong when updating data!");
        }
            console.log(doc);
      });
  
  
  
  
    // console.log(result);
      console.log(query);
  
  
      // // busca por titular y devuelve denominacion completa.
      // const marcaDB = Marca.findOne({ titular: titular }, { denominacionCompleta: denominacionCompleta } );
  
      // // si la encuentra actualiza a estado Publicada
      // //Marca.updateOne({ { titular: titular }, { denominacionCompleta: denominacionCompleta } }, { $set: { tipoEstado: 'Publicada' }}); // executed
  
  
      
  
      // //Marca.updateOne({phone:request.phone}, {$set: { phone: request.phone }}, {upsert: true}, function(err){...}
  
  
  
      // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx Marca de la DB");
  
      // console.log(marcaDB);
  
  
  
      // //const postal = await post.insertMany(record.params.post)
  
      */
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


///////////////////////////////////////////////////////////////////////////////////////////////
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

module.exports = { beforeHookPassword, afterHookPassword, beforeHookUpload, afterHookUpload, afterNewHookUpload};
