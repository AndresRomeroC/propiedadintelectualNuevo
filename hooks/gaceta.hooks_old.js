const argon2 = require('argon2');
const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');
const XLSX  = require('xlsx');

const AdminBro = require('admin-bro');

const  { MarcaSchema, Marca }                                = require('../models/Marca/marca.entity');
const  { GacetaSchema, Gaceta }                              = require('../models/Gaceta/gaceta.entity');
const  { ClaseInternacionalSchema, ClaseInternacional }      = require('../models/ClaseInternacional/claseInternacional.entity');
const { ObjectId } = require('mongoose/lib/schema/index');



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



  if (profileExcelLocation) {
    
    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx INICIO record ===== > ");
    console.log(record);
    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx FIN record ===== > ");
    console.log(profileExcelLocation);
    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx INICIO record ===== > ");


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
      //const pathExcel = `D:\\adminbro\\propiedadintelectualNuevo\\${filePath}`;
      
      const pathExcel = profileExcelLocation.path ;
      
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
  
    // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx INICIO response ===== > ");
    // console.log(response);
    // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx FINresponse ===== > ");
    // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxXXXXXXXXXXXXXXXXXXXXXXXXXX");
  
  
    // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx INICIO context ===== > ");
    // console.log(context);
    // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx FIN context ===== > ");
    // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxXXXXXXXXXXXXXXXXXXXXXXXXXX");
   
    

    const { record, profileExcelLocation } = context;
  
    //console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx INICIO record ===== > ");
    
    
    //console.log(record);
    //console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx fin record ===== > ");

    // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx INICIO record ===== > ");
    // console.log(record);
    // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx FIN record ===== > ");
    // console.log(profileExcelLocation);
    // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx INICIO record ===== > ");
    //console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxXXXXXXXXXXXXXXXXXXXXXXXXXX");
  
    if (profileExcelLocation) {
      if(context.profileExcelLocation.path)
      record.params.profileExcelLocation = context.profileExcelLocation.path;
      //await rimraf.sync(record.params.avatar.substring(0));

      //record.params.profileExcelLocation = profileExcelLocation.name;

      // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxXXXXXXXXXXXXXXXXXXXXXXXXXX profileExcelLocation.name");

      // console.log(profileExcelLocation.name);

      // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxXXXXXXXXXXXXXXXXXXXXXXXXXX record.params");

      // console.log(record.params);

      

      // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxXXXXXXXXXXXXXXXXXXXXXXXXXX");
      // const existeGaceta=  await Gaceta.findOne({ NumberId: record.params.NumberId }).exec();
      // console.log(existeGaceta);
      // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxXXXXXXXXXXXXXXXXXXXXXXXXXX");


    //const filePath = path.join('uploads', record.id().toString(), profileExcelLocation.name);
    const filePath = path.join('uploads\\Gaceta', record.params.NumberId.toString(), profileExcelLocation.name);
    
      //console.log(filePath);
  
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
      //console.log(filePath);
      
  
      //await record.update({ profileExcelLocation: `/${filePath}` });
  
      //record.params.profileExcelLocation = `/${filePath}` ;

     // record.profileExcelLocation = `/${filePath}` ;

      // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx record 2 : record");
      // console.log(record);



      // const gacetaNueva = Gaceta.insertMany(record.params).then(function(){
      //   console.log("Data inserted Gaceta")  // Success
      // }).catch(function(error){
      //     console.log(error)      // Failure
      // });

      // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx gaceta");
      // console.log(gacetaNueva);
  
  
      await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
      //const unNombre = await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
      //console.log(unNombre);
  
      //console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx pathExcel comienza");
      
  
      // 1.- Validar existencia de Gaceta
     // const existeGaceta=  await Gaceta.findOne({ NumberId: record.params.NumberId }).exec();
     
  
     // if( existeGaceta == null ){
        //ARC :Obtener la ruta :
        //D:\adminbro\propiedadintelectualNuevo
        //const pathExcel = `D:\\adminbro\\propiedadintelectualNuevo\\${filePath}`;
      
      await record.update({ profileExcelLocation: `/${filePath}` });

      const pathExcel = profileExcelLocation.path ;
      

      const validaExtensionExcel = profileExcelLocation.name ;

      console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx pathExcel comienza, el cual debe tener el nombre del archivo ");
      console.log(validaExtensionExcel);
      console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx pathExcel termina");

      // validar si el documento corresponde a un excel.
      let esDocumentoPermitido = false;
      if(pathExcel){
        //new Array(".gif", ".jpg", ".doc", ".pdf");
        const extensiones_permitidas = new Array(".xlsx");
        //recupero la extensión de este nombre de archivo
        const extension = (validaExtensionExcel.substring(validaExtensionExcel.lastIndexOf("."))).toLowerCase();
        for (let i = 0; i < extensiones_permitidas.length; i++) {
          
          console.log(extension);
          if (extensiones_permitidas[i] == extension) {
            esDocumentoPermitido = true;
            break;
          }
        }
        console.log(`es documento permitido ${esDocumentoPermitido}`);
        if(esDocumentoPermitido){
          const workbook = XLSX.readFile(pathExcel);
          const nombreHoja = workbook.SheetNames;
          let datos = XLSX.utils.sheet_to_json(workbook.Sheets[nombreHoja[0]]);
          const jDatos = [];
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

            //console.log(`xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  ${i}`);
            //console.log(dato);

            if(dato.claseInternacional){

              // function findOneC(query) {
              //   return new Promise((resv, rej) => {
              //     ClaseInternacional.findOne(query, (err, res) => {
              //     if(err) {
              //       console.log("problemas al buscar la clase internacional");

              //     }
              //     console.log('no hay clase internacional'); 
              //     })
              //   })
              // }  

              //   const existeClaseInternacional=  findOneC({ ClassInt: datos.claseInternacional } );
                                          
              // const existeClaseInternacional =  ClaseInternacional.findOne({ ClassInt: dato.claseInternacional })
              //   .then((result) => {
              //     return result
              //   })
              //   .catch(err => {
              //     console.log("Errores al consultar Clase internacional");
              //   })
              //const existeClaseInternacional =  ClaseInternacional.findOne({ ClassInt: dato.claseInternacional }).exec()
              
              
              //console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  dato.claseInternacionalId");
              //console.log(dato.claseInternacional);
              //const existeClaseInternacional =  await ClaseInternacional.findOne({ ClassInt: typeof parseInt(dato.claseInternacional) }).exec()
              const existeClaseInternacional = await ClaseInternacional.findOne({ ClassInt: dato.claseInternacional }).exec()

              // existeClaseInternacional.then(function(result){
              //   console.log(result)
              //   })
                
                //const existeClaseInternacional= await  ClaseInternacional.where({ ClassInt: datos.claseInternacionalId });

                //console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  existeClaseInternacional");
                //console.log(existeClaseInternacional);

              // console.log(`xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  ${i} : existeClaseInternacional.ClassInt`);
                
                if(existeClaseInternacional){
                  //console.log(existeClaseInternacional._id);
                  dato.claseInternacionalId = existeClaseInternacional._id;
                }
            }

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
    
            Marca.findOneAndUpdate(query, {$set:{tipoEstados:"Publicada"}}, {new: true}, (err, result) => {
              if (err) {
                  console.log("Something wrong when updating data!");
                  Gaceta.deleteOne({
                    _id: record.id()
                  })
                    .then(() => {
                      console.log('Gaceta Deleted!'); 
                    })
                    .catch(err => {
                      console.log("problemas al borrar la gaceta nueva");
                    })
              }
              
              if( result == null ){

                //console.log(`xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  ${i} : record info`);
                //console.log(record);

                if(record.id()) 
                dato.gacetaId = record.id().toString();

                Marca.insertMany(dato).then(function(){
                  console.log("Data inserted")  // Success
                }).catch(function(error){
                    console.log(error)      // Failure
                    //Gaceta.deleteOne({ NumberId: record.params.NumberId }).exec();

                    Gaceta.deleteOne({
                      _id: record.id()
                    })
                      .then(() => {
                        console.log('Gaceta Deleted!'); 
                      })
                      .catch(err => {
                        console.log("problemas al borrar la gaceta nueva");
                      })

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
        }
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


///////////////////////////////////////////////////////////////////////////////////////////////.
/////////////////////////////////////////////////        1   
///////////////////////////////////////////////////////////////////////////////////////////////
const beforeHookPassword = async (request, context) => {
  if (request.method == 'post') {
    const { NumberId, password, ...otherParams } = request.payload;

    // console.log("XXXXXXXXXXXXXXXXXXXXXXXXXX INICIO passport : request 1");
    // console.log(passport);
    // console.log("XXXXXXXXXXXXXXXXXXXXXXXXXX FIN passport : request 1");

    // console.log("XXXXXXXXXXXXXXXXXXXXXXXXXX INICIO beforeHookPassword : request 1");
    // console.log(NumberId);
    // console.log("XXXXXXXXXXXXXXXXXXXXXXXXXX FIN beforeHookPassword : request 1");

    const existeGaceta =  await Gaceta.findOne({ NumberId: NumberId }).exec();
    
    
    // const existeArchivoExcel = context.profileExcelLocation.path;
    // console.log("XXXXXXXXXXXXXXXXXXXXXXXXXX existeArchivoExcel");
    // console.log(existeArchivoExcel);
    
    //  if (existeGaceta) {
    //    throw new ValidationError({
    //      name: {
    //        message: 'Gaceta ya existe 1',
    //      },
    //    }, {
    //      message: 'Gaceta ya existe 2',
    //    })
    //  }
   if (password) {
      const hashPassword = await argon2.hash(password);
      return {
        ...request,
        payload: {
          ...otherParams,
          encryptedPassword: hashPassword,
          existeGaceta,
          //existeArchivoExcel
        },
      };
    }

    return {
      ...request,
      payload: {
        ...otherParams,
        existeGaceta,
//existeArchivoExcel
      },
    };
  }
};
  

///////////////////////////////////////////////////////////////////////////////////////////////.
/////////////////////////////////////////////////        2   
///////////////////////////////////////////////////////////////////////////////////////////////
const beforeHookUpload = async (request, context, modifiedRequest) => {
  if (request.method === 'post') {
    const { existeGaceta, profileExcelLocation, ...otherParams } = request.payload;

    //  console.log("XXXXXXXXXXXXXXXXXXXXXXXXXX INICIO beforeHookUpload : modifiedRequest");
    //  console.log(modifiedRequest);
    //  console.log("XXXXXXXXXXXXXXXXXXXXXXXXXX FIN beforeHookUpload : modifiedRequest");


      // console.log("XXXXXXXXXXXXXXXXXXXXXXXXXX INICIO beforeHookUpload : request");
      // console.log(request);
      // console.log("XXXXXXXXXXXXXXXXXXXXXXXXXX FIN beforeHookUpload : request");

      // console.log("XXXXXXXXXXXXXXXXXXXXXXXXXX INICIO beforeHookUpload : context");
      // console.log(context);
      // console.log("XXXXXXXXXXXXXXXXXXXXXXXXXX FIN beforeHookUpload : context");


    //   console.log("XXXXXXXXXXXXXXXXXXXXXXXXXX context.profileExcelLocation = profileExcelLocation init");
       context.profileExcelLocation = profileExcelLocation;


    //   console.log(profileExcelLocation);

    // console.log("XXXXXXXXXXXXXXXXXXXXXXXXXX context.profileExcelLocation = profileExcelLocation fin");


    //context.existeGaceta = existeGaceta;
    // console.log("XXXXXXXXXXXXXXXXXXXXXXXXXX INICIO beforeHookUpload : existeGaceta 1");
    // console.log(existeGaceta);
    // console.log("XXXXXXXXXXXXXXXXXXXXXXXXXX INICIO beforeHookUpload : existeGaceta 1");

    // 1.- Validar existencia de Gaceta
    //const existeGaceta2=  await Gaceta.findOne({ NumberId: record.params.NumberId }).exec();
    //console.log("XXXXXXXXXXXXXXXXXXXXXXXXXX INICIO beforeHookUpload : existeGaceta 2");
    //console.log(existeGaceta2);
    //console.log("XXXXXXXXXXXXXXXXXXXXXXXXXX INICIO beforeHookUpload : existeGaceta 2");

   // console.log("XXXXXXXXXXXXXXXXXXXXXXXXXX actions - context.beforeHookUpload");
   // console.log(context)
    //console.log("XXXXXXXXXXXXXXXXXXXXXXXXXX actions - context.beforeHookUpload");
  
    return {
      ...request,
      payload: otherParams,
    };
  }
  return request;
};

  const afterHookPassword = async (response, context) => {
    if (response.record && response.record.errors) {
      response.record.errors.password = response.record.errors.encryptedPassword;
    }
    // const existeGaceta3=  await Gaceta.findOne({ NumberId: record.params.NumberId }).exec();
    // console.log("XXXXXXXXXXXXXXXXXXXXXXXXXX INICIO afterHookPassword : existeGaceta3 3");
    // console.log(existeGaceta3);
    // console.log("XXXXXXXXXXXXXXXXXXXXXXXXXX INICIO afterHookPassword : existeGaceta3 3");

    return response;
  };

module.exports = { beforeHookPassword, afterHookPassword, beforeHookUpload, afterHookUpload, afterNewHookUpload};
