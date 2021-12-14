const argon2 = require('argon2');
const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');
const XLSX  = require('xlsx');

const AdminBro = require('admin-bro');

const  { MarcaSchema, Marca }                                = require('../models/Marca/marca.entity');
const  { GacetaSchema, Gaceta }                              = require('../models/Gaceta/gaceta.entity');
const  { ClaseInternacionalSchema, ClaseInternacional }      = require('../models/ClaseInternacional/claseInternacional.entity');
const  { CustomerSchema, Customer }      = require('../models/Customer/customer.entity');


const { ObjectId } = require('mongoose/lib/schema/index');



const afterHookUpload = async (response, context) => {
  
  var formaN=true;
  if(formaN){
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

            Marca.findOneAndUpdate(query, {$set:{tipoEstado:"Caducidad del trámite de renovación"}}, {new: true}, (err, result) => {
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
  }
};

const afterNewHookUpload = async (response, context) => {
  
  var formaN = true;
  if(formaN){
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
      let totalRegistrosImportados = 0;
      let totalRegistrosConSimilitudExacta = 0;
      let arrConSimilitudExacta = new Array();

      let totalRegistrosConSimilitudMedia = 0;
      let arrConSimilitudMedia = new Array();

      let arrConSinSimilitud = new Array();
      let totalRegistrosSinSimilitud = 0;

      //console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx pathExcel comienza, el cual debe tener el nombre del archivo ");
      //console.log(validaExtensionExcel);
      //console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx pathExcel termina");

      // validar si el documento corresponde a un excel.
      let esDocumentoPermitido = false;
      if(pathExcel){
        //new Array(".gif", ".jpg", ".doc", ".pdf");
        const extensiones_permitidas = new Array(".xlsx");
        //recupero la extensión de este nombre de archivo
        const extension = (validaExtensionExcel.substring(validaExtensionExcel.lastIndexOf("."))).toLowerCase();
        for (let i = 0; i < extensiones_permitidas.length; i++) {
          
          //console.log(extension);
          if (extensiones_permitidas[i] == extension) {
            esDocumentoPermitido = true;
            break;
          }
        }

        // let totalRegistrosImportados = 0;
        // let totalRegistrosConSimilitudExacta = 0;
        // let arrConSimilitudExacta = new Array();

        // let totalRegistrosConSimilitudMedia = 0;
        // let arrConSimilitudMedia = new Array();
        // let totalRegistrosSinSimilitud = 0;

        //console.log(`es documento permitido ${esDocumentoPermitido}`);
        if(esDocumentoPermitido){
          const workbook = XLSX.readFile(pathExcel);
          const nombreHoja = workbook.SheetNames;
          let datos = XLSX.utils.sheet_to_json(workbook.Sheets[nombreHoja[0]]);
          const jDatos = [];

          const forma1 = false;
            const forma2 = false;
            const forma3 = false;


          for (let i = 0; i < datos.length; i++) {
            
            let dato = datos[i];
            totalRegistrosImportados++;
            
            // const denominacionCompleta = dato.denominacionCompleta;
            // const titular = dato.titular;
            // const query = { titular, denominacionCompleta};

            /////////////////////////////////////////////////////////////////////////
            // Para comparar si corresponde a una Marca previamente registrada
            // que vendr[a] en una Gaceta, se considera el numeroSolicitud,es unico
            /////////////////////////////////////////////////////////////////////////
            const numeroSolicitud = dato.numeroSolicitud;
            const query = { numeroSolicitud };

            

            if(dato.claseInternacional){              
              const existeClaseInternacional = await ClaseInternacional.findOne({ ClassInt: dato.claseInternacional }).exec()
              if(existeClaseInternacional){
                dato.claseInternacionalId = existeClaseInternacional._id;
              }
            }

            /////////////////////////////////////////////////////////////////////////
            // Existen terminos que no deben ser comparados en la Similitud Exacta o Media.
            /////////////////////////////////////////////////////////////////////////
            //const denominacionCompleta = "LOGOTIPO arc ELIASs PERRO SAPO";
            const terminos_no_comparativos = new Array("GRÁFICA", "DISEÑO", "MIXTA",  
            "FIGURATIVA", "DENOMINATIVA", "NOMINATIVA", "ISOTIPO",
            " MÁS LOGOTIPO","MÁS LOGOTIPO ",  "MÁS LOGOTIPO", "& LOGOTIPO", "LOGOTIPO", "LOGO",
            "& DESIGN","DESIGN",
            "& DEVICE","DEVICE",  );
            
            let denominacionCompletaT = JSON.parse( JSON.stringify( dato.denominacionCompleta ) );
            let denominacionSinTermino = JSON.parse( JSON.stringify( dato.denominacionCompleta ) );
            
            console.log('--------------------------------------- : denominacionCompleta+ denominacionSinTermino');
             if(denominacionCompletaT) console.log(denominacionCompletaT); 
             if(denominacionSinTermino) console.log(denominacionSinTermino); 
            console.log('--------------------------------------- ');

            for(let i = 0; i < terminos_no_comparativos.length; i++) {
                   let str = terminos_no_comparativos[i];
              if(denominacionCompletaT.includes(str)){
                denominacionSinTermino = denominacionCompletaT.substring(0,denominacionCompletaT.indexOf(str))
                    + denominacionCompletaT.substring(denominacionCompletaT.substring(0,denominacionCompletaT.indexOf(str)).length +str.length);
                    break;
              }   
            }
            console.log('--------------------------------------- : DESPUES DEL FOR denominacionCompleta+ denominacionSinTermino');
             if(denominacionCompletaT) console.log(denominacionCompletaT); 
             if(denominacionSinTermino) console.log(denominacionSinTermino); 
            console.log('--------------------------------------- ');
            //denominacionSinTermino// contiene la denominacionCompleta sin el termino que no debe compararse

            
            
            
            const existeNumeroSolicitud = await Marca.findOne({ numeroSolicitud : dato.numeroSolicitud }).exec()

            console.log('--------------------------------------- : existeNumeroSolicitud');
            console.log(existeNumeroSolicitud);
            console.log('--------------------------------------- : fin existeNumeroSolicitud');


            /////////////////////////////////////////////////////////////////////////
            // Validacion de denominacion completa y titular con Similitud Exacta
            /////////////////////////////////////////////////////////////////////////
            //const conSimilitudExacta = await Marca.findOne({ denominacionCompleta: dato.denominacionCompleta } ).exec()
            let conSimilitudMedia =new Array();
            let conSimilitudExacta =new Array();
            console.log('--------------------------------------- : INICIO existeNumeroSolicitud');
            console.log(existeNumeroSolicitud);
            console.log('--------------------------------------- : FIN existeNumeroSolicitud');

            if(existeNumeroSolicitud == null){
              conSimilitudExacta= await Marca.aggregate([
                {
                  $match: 
                  {
                    //denominacionCompleta: { $regex: denominacion6Primeros0 }
                    //denominacionCompleta: dato.denominacionCompleta
                    denominacionCompleta: { $regex: `^${denominacionSinTermino}$`}//{ $regex: /^BARCELONA/ }
                  }
                }, 
                { 
                  $lookup:{
                    from:"customers",
                    localField: "titular",
                    foreignField:"Name",
                    as: "customers",
                    pipeline: [ 

                        { $match: { Name: { $exists: true } } },
                      ],
                    //let:{denominacionCompleta : dato.denominacionCompleta},
                    //pipeline : [
                    //  {$match: {$expr: {$eq: ['$Name', '$Name']}}}
                    //]
                  }                
                },{
                    $project:{
                    _id:1,
                    customers : 1
                  }
                },
                {"$unwind":"$customers"},
                {"$match":{"customers":{"$ne":[]}}}
              ]).exec()
            
            console.log('--------------------------------------- : RESULTADO DEL QUERY conSimilitudExacta');
            if(conSimilitudExacta.length)console.log(conSimilitudExacta); 
           console.log('--------------------------------------- FIN RESULTADO DEL QUERY conSimilitudExacta');


            /////////////////////////////////////////////////////////////////////////
            // validacion de denominacion completa  de  6 caracteres y titular /^cadena/
            /////////////////////////////////////////////////////////////////////////
            //denominacionSinTermino.substring(0,6);
            let denominacion6Primeros0 = JSON.parse( JSON.stringify(denominacionSinTermino.substring(0,6)) );

            //let denominacion6Primeros = JSON.parse( JSON.stringify( "/^"+denominacion6Primeros0+"/") );

            //console.log('--------------------------------------- : RESULTADO DEL QUERY denominacion6Primeros');
            //console.log(denominacion6Primeros); 
           //console.log('--------------------------------------- FIN RESULTADO DEL QUERY denominacion6Primeros');

           //1
           //Obtiene todas las coincidencias que contienen la palabra
           // const conSimilitudMedia = await Marca.findOne({ denominacionCompleta: { $regex: denominacion6Primeros0 }}).exec()
           
           //2
           if(!conSimilitudExacta.length){
            conSimilitudMedia = await Marca.aggregate([
              {
                $match: 
                {
                  denominacionCompleta: { $regex: `^${denominacion6Primeros0}`}//{ $regex: /^BARCELONA/ }
                }
              }, 
              { 
                 $lookup:{
                  // from:"customers",
                  // localField: "titular",
                  // foreignField:"Name",
                  // as: "x",
                  from: "customers",
                  localField: "titular",
                  foreignField: "Name",
                  //let: { titular: "$titular" },
                  pipeline: [ 
                  //   {                      
                  //      $match: 
                  //       { $expr:
                  //         //{ $and:
                  //           [
                  //             { $eq: [ "$Name", "$$titular" ] }
                  //           ]
                  //         //}
                  //       } 
                      
                  //       // "customers": { 
                  //       //   $exists: true,
                  //       //   $ne: [],
                  //       // },                        
                                                                
                  //   },
                    { $match: { Name: { $exists: true } } },
                  ],
                  as: "customers"

                 }                
               },
               {
                  $project:{
                   _id:1,
                   //titular:1,
                   customers : 1
                 }
               },
              //  {
              //   $unwind: {
              //     path: "$x",
              //     "preserveNullAndEmptyArrays": true
              //   }
              // },
              {$unwind:"$customers"},
              {$match:{"customers":{$ne:[]}}}
             ]).exec()
            }
           // const conSimilitudMedia = await Marca.findOne({ denominacionCompleta: { $regex: denominacion6Primeros }}).exec()
            console.log('--------------------------------------- : RESULTADO DEL QUERY conSimilitudMedia');
            if(conSimilitudMedia.length)console.log(conSimilitudMedia); 
            console.log('--------------------------------------- FIN RESULTADO DEL QUERY conSimilitudMedia');
          }

          if(forma3){
            if( conSimilitudExacta || conSimilitudMedia){
              
              //verificar si el titular es de LexValor
              esTitularLexValor = await Customer.findOne({ Name: conSimilitudExacta.titular }).exec()
              // console.log('--------------------------------------- : esTitularLexValor 1');
              // if(esTitularLexValor) console.log(esTitularLexValor); 
              // console.log('--------------------------------------- ');
              // if(forma1){

              //   let esMarcaParaPublicar = await Marca.findOne(query).exec()
              //   console.log('--------------------------------------- esMarcaParaPublicar 5');
              //   console.log(esMarcaParaPublicar);
              //   if(esMarcaParaPublicar == null){

              //         totalRegistrosConSimilitudExacta++;

              //         console.log('--------------------------------------- totalRegistrosConSimilitudExacta 5');
              //         console.log(totalRegistrosConSimilitudExacta);
              //         console.log('--------------------------------------- arrConSimilitudExacta 5');
              //         arrConSimilitudExacta.push(conSimilitudExacta);
              //   }
                
              // }              
            }
          }
          console.log('--------------------------------------- : eL NUEVO NUMERO DE ID DE GACETA ES : ');
          console.log(record.id());
          console.log('--------------------------------------- : FIN NUEVO NUMERO DE ID DE GACETA');
          if(record.id()) 
                dato.gacetaId = record.id().toString();
                
                // Crea la Marca para obtener el ID que se insertará
                let documents = Object.keys({dato} ).map( key => {
                  return new Marca(   {dato}   );
                });

                dato._id = documents[0]._id;
                console.log('--------------------------------------- Inicio nuevaMarca final : dato._id ');
                console.log(dato._id )  // Success
                console.log('--------------------------------------- Fin nuevaMarca final : dato._id ');

                console.log('--------------------------------------------------------------------------------- INICIO forma 300');
           // Validacion de denominacion completa y titular
           if(conSimilitudExacta.length){
             //verificar si el titular es de LexValor
             //if(esTitularLexValor){
            //AGREGAR CON QUIEN ES LA SIMILITUD
            dato.marcaConSimilitudExacta = new Array();
            for(let j = 0; j  < conSimilitudExacta.length; j++) {
              let marcaId1 = conSimilitudExacta[j]._id;

              console.log('---------------------XXX marcaId1' );
              console.log(marcaId1);
              console.log('---------------------XXX marcaId1' );
              dato.marcaConSimilitudExacta.push(marcaId1);
            
            }
                totalRegistrosConSimilitudExacta++;
                arrConSimilitudExacta.push(dato);
               console.log('---------------------XXX arrConSimilitudExacta' );
               console.log(arrConSimilitudExacta );
               // // GUARDAR LA INFO CON CADA COINCIDENCIA
                //record.update({ conSimilitudExacta: arrConSimilitudExacta});
            // }
          }else if(conSimilitudMedia.length){
            totalRegistrosConSimilitudMedia++;
            
            //AGREGAR CON QUIEN ES LA SIMILITUD
            dato.marcaConSimilitudMedia = new Array();
            for(let k = 0; k < conSimilitudMedia.length; k++) {
              let marcaId2 = conSimilitudMedia[k]._id;

              console.log('---------------------XXX marcaId2' );
              console.log(marcaId2);
              console.log('---------------------XXX marcaId2' );
              dato.marcaConSimilitudMedia.push(marcaId2);
            
            }
            // AGREGAR SIMILITUDES                                 
            arrConSimilitudMedia.push(dato);
            console.log('---------------------XXX conSimilitudMedia' );
            console.log(arrConSimilitudMedia );
             // GUARDAR LA INFO CON CADA COINCIDENCIA
             //record.update({ conSimilitudMedia: arrConSimilitudMedia});
           }else{
            totalRegistrosSinSimilitud++;
            if(existeNumeroSolicitud) dato._id = existeNumeroSolicitud._id;



           
            arrConSinSimilitud.push(dato);
            console.log('---------------------XXX totalRegistrosSinSimilitud' );
            console.log(arrConSinSimilitud);
           
           }
            
           //if(forma3){ // PARA PRUEBAS SIN GUARDAR NADA
            // encuentra marcas con el mismo numero de solicitud, si la encuentra la pone en estado PUBLICADA
            // Si no encuentra entones la Guarda como Marca Nueva.
            Marca.findOneAndUpdate({numeroSolicitud : dato.numeroSolicitud }, {$set:{tipoEstado:"Publicada", gacetaId: dato.gacetaId}}, {new: true}, (err, result) => {
              console.log('--------------------------------------------------------------------------------- INICIO forma 300');
          // Validacion de denominacion completa y titular
          // if(conSimilitudExacta.length){
          //   //verificar si el titular es de LexValor
          //   //if(esTitularLexValor){
              
          //      totalRegistrosConSimilitudExacta++;
          //      arrConSimilitudExacta.push(dato);

          //      console.log('---------------------XXX arrConSimilitudExacta' );
          //     // // GUARDAR LA INFO CON CADA COINCIDENCIA
          //     // record.update({ conSimilitudExacta: arrConSimilitudExacta});
          //  // }

          // }else if(conSimilitudMedia.length){

          //   totalRegistrosConSimilitudMedia++;
          //   arrConSimilitudMedia.push(dato);

          //   console.log('---------------------XXX conSimilitudMedia' );
          //   // GUARDAR LA INFO CON CADA COINCIDENCIA
          //   //record.update({ conSimilitudMedia: arrConSimilitudMedia});
          // }else{
          //   totalRegistrosSinSimilitud++;
          //   console.log('---------------------XXX totalRegistrosSinSimilitud' );
          // }
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

                // if(record.id()) 
                // dato.gacetaId = record.id().toString();

                // // if(forma2){
                // //   console.log(`----------------------------------------------------------------------------- conSimilitudExacta-----2`);
                // //   console.log(conSimilitudExacta);
                // //   console.log('--------------------------------------- : esTitularLexValor 2');
                // //   if(esTitularLexValor) console.log(esTitularLexValor); 

                // //   // Validacion de denominacion completa y titular
                // //   if(conSimilitudExacta){
                // //     console.log(`----------------------------------------------------------------------------- conSimilitudExacta-----3`);
                // //     console.log(conSimilitudExacta);
                // //     //verificar si el titular es de LexValor
                // //     if(esTitularLexValor){
                // //       console.log('--------------------------------------- : esTitularLexValor 3');
                // //       console.log(esTitularLexValor);

                // //       totalRegistrosConSimilitudExacta++;

                // //       console.log('--------------------------------------- totalRegistrosConSimilitudExacta 4');
                // //       console.log(totalRegistrosConSimilitudExacta);
                // //       console.log('--------------------------------------- arrConSimilitudExacta 4');
                // //       arrConSimilitudExacta.push(conSimilitudExacta);
                // //       console.log(arrConSimilitudExacta);
                // //       console.log('---------------------------------------------------------------------------------');

                // //           //aqui actualizar
                // //       console.log('--------------------------------------- arrConSimilitudExacta final');
                // //       console.log(arrConSimilitudExacta);
                    
                // //       record.update({ conSimilitudExacta: arrConSimilitudExacta});

                // //       console.log('---------------------------------------------------------------------------------');


                // //     }
                // //   }
                // // }

                
                // // Crea la Marca para obtener el ID que se insertará
                // let documents = Object.keys({dato} ).map( key => {
                //   return new Marca(   {dato}   );
                // });

                // dato._id = documents[0]._id;
                // console.log('--------------------------------------- Inicio nuevaMarca final : dato._id ');
                // console.log(dato._id )  // Success
                // console.log('--------------------------------------- Fin nuevaMarca final : dato._id ');

                // De existir similitud Exacta y esCliente de LEX valor, 
                // entonces actualiza el arr de Similitud exacta
               // if(forma3){
                // console.log('--------------------------------------------------------------------------------- INICIO forma 3');
                //   // Validacion de denominacion completa y titular
                //   if(conSimilitudExacta.length){
                //     //verificar si el titular es de LexValor
                //     //if(esTitularLexValor){
                      
                //        totalRegistrosConSimilitudExacta++;
                //        arrConSimilitudExacta.push(dato);

                //        console.log('---------------------XXX arrConSimilitudExacta' );
                //       // // GUARDAR LA INFO CON CADA COINCIDENCIA
                //       // record.update({ conSimilitudExacta: arrConSimilitudExacta});
                //    // }

                //   }else if(conSimilitudMedia.length){

                //     totalRegistrosConSimilitudMedia++;
                //     arrConSimilitudMedia.push(dato);

                //     console.log('---------------------XXX conSimilitudMedia' );
                //     // GUARDAR LA INFO CON CADA COINCIDENCIA
                //     //record.update({ conSimilitudMedia: arrConSimilitudMedia});
                //   }else{
                //     totalRegistrosSinSimilitud++;
                //     console.log('---------------------XXX totalRegistrosSinSimilitud' );
                //   }
                
                dato.tipoEstado= "Publicada";
                 Marca.insertMany(dato).then(function(){
                    console.log("Data inserted")  // Success
                    
          //  console.log('--------------------------------------------------------------------------------- INICIO forma 300');
          //  // Validacion de denominacion completa y titular
          //  if(conSimilitudExacta.length){
          //    //verificar si el titular es de LexValor
          //    //if(esTitularLexValor){
            
          //       totalRegistrosConSimilitudExacta++;
          //       arrConSimilitudExacta.push(dato);
          //      console.log('---------------------XXX arrConSimilitudExacta' );
          //      console.log(arrConSimilitudExacta );
          //      // // GUARDAR LA INFO CON CADA COINCIDENCIA
          //       //record.update({ conSimilitudExacta: arrConSimilitudExacta});
          //   // }
          // }else if(conSimilitudMedia.length){
          //   totalRegistrosConSimilitudMedia++;
          //     arrConSimilitudMedia.push(dato);
          //   console.log('---------------------XXX conSimilitudMedia' );
          //   console.log(arrConSimilitudMedia );
          //    // GUARDAR LA INFO CON CADA COINCIDENCIA
          //    //record.update({ conSimilitudMedia: arrConSimilitudMedia});
          //  }else{
          //    totalRegistrosSinSimilitud++;
          //    console.log('---------------------XXX totalRegistrosSinSimilitud' );
          //  }
                  }).catch(function(error){
                      console.log(error)      // Failure
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
                  //ARC
                  //console.log(result);
            });

            //}forma3

          }//fin if FOR RECORRE EXCEL
          // // //aqui actualizar
        //  console.log('--------------------------------------- arrConSimilitudExacta final');
        // //             console.log(arrConSimilitudExacta);
                   
        //  record.update({ conSimilitudExacta: arrConSimilitudExacta});
        //  record.update({ conSimilitudMedia: arrConSimilitudMedia});

        //  console.log('--------------------------------------------------------------------------------- totales finales');
        //  console.log(`totalRegistrosImportados : ${totalRegistrosImportados}`);
        //  console.log(`totalRegistrosConSimilitudExacta : ${totalRegistrosConSimilitudExacta}`);
        //  console.log(`totalRegistrosConSimilitudMedia : ${totalRegistrosConSimilitudMedia}`);
        //  console.log(`totalRegistrosSinSimilitud : ${totalRegistrosSinSimilitud}`);
        //  console.log('--------------------------------------------------------------------------------- totales finales');


        }// FIN IF  esDocumentoPermitido

        // // //aqui actualizar
        // console.log('--------------------------------------- arrConSimilitudExacta final');
        // //             console.log(arrConSimilitudExacta);
                   
        //  await record.update({ conSimilitudExacta: arrConSimilitudExacta});
        //  await record.update({ conSimilitudMedia: arrConSimilitudMedia});

        //  console.log('--------------------------------------------------------------------------------- totales finales');
        //  console.log(`totalRegistrosImportados : ${totalRegistrosImportados}`);
        //  console.log(`totalRegistrosConSimilitudExacta : ${totalRegistrosConSimilitudExacta}`);
        //  console.log(`totalRegistrosConSimilitudMedia : ${totalRegistrosConSimilitudMedia}`);
        //  console.log(`totalRegistrosSinSimilitud : ${totalRegistrosSinSimilitud}`);
        //  console.log('--------------------------------------------------------------------------------- totales finales');

      } // FIN DE PATH EXCEL

              // //aqui actualizar
              console.log('--------------------------------------- arrConSimilitudExacta final');
              //             console.log(arrConSimilitudExacta);
                         
               await record.update({ conSimilitudExacta: arrConSimilitudExacta});
               await record.update({ conSimilitudMedia: arrConSimilitudMedia});
               await record.update({ totalRegistrosImportados: totalRegistrosImportados});
               await record.update({ sinSimilitud: arrConSinSimilitud});
      
               console.log('--------------------------------------------------------------------------------- totales finales');
               console.log(`totalRegistrosImportados : ${totalRegistrosImportados}`);
               console.log(`totalRegistrosConSimilitudExacta : ${totalRegistrosConSimilitudExacta}`);
               console.log(`totalRegistrosConSimilitudMedia : ${totalRegistrosConSimilitudMedia}`);
               console.log(`totalRegistrosSinSimilitud : ${totalRegistrosSinSimilitud}`);
               console.log('--------------------------------------------------------------------------------- totales finales');
      
    }
    return response;
 
 
 
 
 }
 };

  
const afterDeleteHookUpload = async (response, context) => {

  // console.log('==================== INICIO RESPONSE');
  // console.log(response);
  // console.log('==================== FIN RESPONSE');
  
  // console.log('==================== INICIO context');
  // console.log(context);
  // console.log('==================== INICIO context');

  const formaN = true;


  if(formaN){
    
    const { record, profileExcelLocation } = context;
    
    const gacetaIdN =  record.params._id;

    console.log('==================== record.params.NumberId');
    console.log(gacetaIdN);
    console.log('==================== new ObjectId(gacetaIdN)');
    //var o_id = new ObjectId(gacetaIdN);
    //console.log(  o_id );
  
    const marcasBorradas = await Marca.deleteMany(
      { gacetaId: gacetaIdN, 
        //tipoEstado :  {$in: ["Publicada1"]}
      }
        ).exec()
  
        console.log('==================== INICIO marcasBorradas');
        console.log(marcasBorradas);
        console.log('==================== INICIO marcasBorradass');

        var msgDelete = `Gaceta número ${record.params.NumberId} eliminada con éxito`

        if(marcasBorradas)
          msgDelete = `Gaceta número ${record.params.NumberId} y sus ${marcasBorradas.deletedCount} Marcas fueron eliminadas con éxito`

        response.notice.message = msgDelete;
        response.notice.type = 'success';
    
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

module.exports = { beforeHookPassword, afterHookPassword, beforeHookUpload, afterHookUpload, afterNewHookUpload, afterDeleteHookUpload};
