const argon2 = require('argon2');
const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');
const XLSX  = require('xlsx');
const mongoose = require('mongoose');


const  { MarcaSchema, Marca }                                = require('../models/Marca/marca.entity');

const afterHookUpload = async (response, context) => {
  

  
  const { record, documentoAdjunto } = context;
  if (documentoAdjunto) {
    console.log('/////////////////////////////////////////////////////////////////////');
    console.log(documentoAdjunto);
    console.log('/////////////////////////////////////////////////////////////////////');
    console.log(record);
    console.log('/////////////////////////////////////////////////////////////////////');
    
    /////////////////////////////////////////////////////////////////////
    //await rimraf.sync(record.params.avatar.substring(0));
    ///////////////////////////////////////////////////////////////////// Revisar utilidad :

    const filePath = path.join('uploads\\Marca', record.id().toString(), documentoAdjunto.name);
    
    await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
    
    /////////////////////////////////////////////////////////////////////
    //await fs.promises.rename(avatar.path, filePath);
    ///////////////////////////////////////////////////////////////////// Reemplazado con :
    
    fs.copyFile(documentoAdjunto.path, filePath, function (err) {
      if (err) throw err;
    });

    await record.update({ documentoAdjunto: `/${filePath}` });

    //const unNombre = 
    await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
    //console.log(unNombre);

    // const pathPdf = `D:\\adminbro\\luandev\\adminbro-master\\${filePath}`;
    // console.log(pathPdf);
    // console.log(` el Path del Pdf Adjunto es : ${pathPdf}`);


  }
  return response;
};

const afterNewHookUpload = async (response, context) => {
  

  
  const { record, documentoAdjunto } = context;
  if (documentoAdjunto) {

    /////////////////////////////////////////////////////////////////////
    //await rimraf.sync(record.params.avatar.substring(0));
    ///////////////////////////////////////////////////////////////////// Revisar utilidad :

    const filePath = path.join('uploads\\Marca', record.id().toString(), documentoAdjunto.name);
    
    await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
    
    /////////////////////////////////////////////////////////////////////
    //await fs.promises.rename(avatar.path, filePath);
    ///////////////////////////////////////////////////////////////////// Reemplazado con :
    
    fs.copyFile(documentoAdjunto.path, filePath, function (err) {
      if (err) throw err;
    });

    await record.update({ documentoAdjunto: `/${filePath}` });

    //const unNombre = 
    await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
    //console.log(unNombre);

    const pathPdf = `D:\\adminbro\\luandev\\adminbro-master\\${filePath}`;
    console.log(pathPdf);
    console.log(` el Path del Pdf Adjunto es : ${pathPdf}`);

    // const query = { NumberId: record.params.NumberId };

    // console.log('=============== INICIO query DE beforeHookUpload');
    // console.log(query);
    // console.log('=============== FIN DE query DE beforeHookUpload');


    // Marca.findOneAndUpdate(query, {$set:{ documentoAdjunto: `/${filePath}` }}, {new: true}, (err, result) => {
    //                 if (err) {
    //                     console.log("Something wrong when updating data! XXXXXXX MARCA - DOCUMENTO ADJUNTO");
    
    //                 }
                    
    //                 if( result == null ){
    
    //                  console.log(" RESULTADO NULL XXXXXXX MARCA - DOCUMENTO ADJUNTO");
    //                 }
    //                     console.log(result);
    //               });

  }
  return response;
};

const afterDeleteHookUpload = async (response, context) => {

  const formaN = true;
  if(formaN){
    
    const { record, profileExcelLocation } = context;
    
    const marcaIdN =  record.params._id;

    console.log('==================== record.params.NumberId a borrar');
    console.log(marcaIdN);
    console.log('==================== record.params.NumberId a borrar');

    // let conSimilitudExacta =new Array();

    // conSimilitudExacta = await Marca.aggregate([
    // {
    //     $match: 
    //     {
    //       marcaConSimilitudMedia: mongoose.Types.ObjectId(`${marcaIdN}`)
    //     }
    // }
    // ]).exec();

    // console.log('--------------------------------------- : RESULTADO DEL QUERY conSimilitudExacta');
    // console.log(conSimilitudExacta); 
    // console.log('--------------------------------------- FIN RESULTADO DEL QUERY conSimilitudExacta');

    const marcasBorradas = await Marca.updateMany(
      { marcaConSimilitudMedia: mongoose.Types.ObjectId(`${marcaIdN}`)
      },
      { $pull: {  marcaConSimilitudMedia: mongoose.Types.ObjectId(`${marcaIdN}`) }}, // item(s) to match from array you want to pull/remove
      { multi: true } // set this to true if you want to remove multiple elements.
    )
    const marcasBorradas2 = await Marca.updateMany(
      { marcaConSimilitudExacta: mongoose.Types.ObjectId(`${marcaIdN}`)
      },
      { $pull: {  marcaConSimilitudExacta: mongoose.Types.ObjectId(`${marcaIdN}`) }}, // item(s) to match from array you want to pull/remove
      { multi: true } // set this to true if you want to remove multiple elements.
    )
    console.log('==================== INICIO marcasBorradas-marcaConSimilitudMedia');
    console.log(marcasBorradas);
    console.log('==================== INICIO marcasBorradass-marcaConSimilitudMedia'); 
    console.log('==================== INICIO marcasBorradas-marcaConSimilitudExacta');
    console.log(marcasBorradas2);
    console.log('==================== INICIO marcasBorradass-marcaConSimilitudExacta'); 

    const gacetaActualizadaSinSimilitud = await Gaceta.updateMany(
      { sinSimilitud: mongoose.Types.ObjectId(`${marcaIdN}`)
      },
      { $pull: {  sinSimilitud: mongoose.Types.ObjectId(`${marcaIdN}`) }}, // item(s) to match from array you want to pull/remove
      { multi: true } // set this to true if you want to remove multiple elements.
    )
    console.log('==================== INICIO gacetaActualizada-sinSimilitud');
    console.log(gacetaActualizadaSinSimilitud);
    console.log('==================== INICIO gacetaActualizada-sinSimilitud'); 
    
    const gacetaActualizadaconSimilitudExacta = await Gaceta.updateMany(
      { conSimilitudExacta: mongoose.Types.ObjectId(`${marcaIdN}`)
      },
      { $pull: {  conSimilitudExacta: mongoose.Types.ObjectId(`${marcaIdN}`) }}, // item(s) to match from array you want to pull/remove
      { multi: true } // set this to true if you want to remove multiple elements.
    )
    console.log('==================== INICIO gacetaActualizada-conSimilitudExacta');
    console.log(gacetaActualizadaconSimilitudExacta);
    console.log('==================== INICIO gacetaActualizada-conSimilitudExacta');  
    
    const gacetaActualizadaconSimilitudMedia = await Gaceta.updateMany(
      { conSimilitudMedia: mongoose.Types.ObjectId(`${marcaIdN}`)
      },
      { $pull: {  conSimilitudMedia: mongoose.Types.ObjectId(`${marcaIdN}`) }}, // item(s) to match from array you want to pull/remove
      { multi: true } // set this to true if you want to remove multiple elements.
    )
    console.log('==================== INICIO gacetaActualizada-conSimilitudExacta');
    console.log(gacetaActualizadaconSimilitudMedia);
    console.log('==================== INICIO gacetaActualizada-conSimilitudExacta');  
  }
  return response;
};


const beforeHookUpload = async (request, context) => {
  
  // console.log('=============== INICIO DE request DE beforeHookUpload');
  // console.log(request);
  //  console.log('=============== FIN DE request DE beforeHookUpload');
  
  if (request.method === 'post') {
    const { documentoAdjunto, ...otherParams } = request.payload;

    console.log('=============== INICIO DE DOCUMENTO ADJUNTO DE beforeHookUpload');
    console.log(documentoAdjunto);
    console.log('=============== FIN DE DOCUMENTO ADJUNTO DE beforeHookUpload');
    
    context.documentoAdjunto = documentoAdjunto;

    return {
      ...request,
      payload: otherParams,
    };
  }
  return request;
};


//////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////   1
//////////////////////////////////////////////////////////////////////////////////
const beforeHookPassword = async (request, context) => {
  
  // console.log('=============== modifiedRequest - INICIO DE request DE beforeHookUpload');
  // console.log(request);
  //  console.log('=============== FIN DE request DE beforeHookUpload');
  
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

module.exports = { beforeHookPassword, afterHookPassword, beforeHookUpload, afterHookUpload, afterNewHookUpload, afterDeleteHookUpload};
