const  { MarcaSchema, Marca } = require('../../models/Marca/marca.entity');
const  { MarcaPorVencerSchema, MarcaPorVencer } = require('../../models/MarcaPorVencer/marcaPorVencer.entity');
const  { MarcaSinPublicarSchema, MarcaSinPublicar } = require('../../models/MarcaSinPublicar/marcaSinPublicar.entity');
const  { MarcaPublicadaSchema, MarcaPublicada } = require('../../models/MarcaPublicada/marcaPublicada.entity');
const  { MarcaConResolucionSchema, MarcaConResolucion } = require('../../models/MarcaConResolucion/marcaConResolucion.entity');
const  { MarcaEnOposicionSchema, MarcaEnOposicion } = require('../../models/MarcaEnOposicion/marcaEnOposicion.entity');
const  { EstadoMarcaSchema, EstadoMarca } = require('../../models/EstadoMarca/estadoMarca.entity');
const { ObjectId } = require('mongoose/lib/schema/index');

const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));

exports.job = async () => {
 

    let prueba = true;
    let pruebaMultiEstado = true;



    const existeNumeroSolicitud = null;//await Marca.findOne({ numeroSolicitud :  dato}).exec();

    console.log('--------------------------------------- : existeNumeroSolicitud');
    console.log(existeNumeroSolicitud);
    console.log('--------------------------------------- : fin existeNumeroSolicitud');

    //COMIENZA MARCAS POR VENCER
    if(prueba){

        let conSimilitudExacta =new Array();

        const marcasBorradas = await MarcaPorVencer.remove().exec();

        console.log('==================== INICIO marcasBorradas');
        console.log(marcasBorradas);
        console.log('==================== INICIO marcasBorradass');

        
        if(existeNumeroSolicitud == null){
            conSimilitudExacta = await Marca.aggregate([
            {
                $match: 
                {
                    fechaVencimientoResolucion: { $exists: true },
                    fechaVencimientoResolucion : {$gte : new Date()},
                    //denominacionCompleta: { $regex: `^${denominacionSinTermino}$`}//{ $regex: /^BARCELONA/ }
                    $expr:
                    {                
                    $lte:
                        [ "$fechaVencimientoResolucion",
                            {
                            $dateAdd:
                                {
                                    startDate: new Date(),
                                    unit: "month",
                                    amount: 6
                                }
                            }
                        ]
                    }
                }
            },
            { 
                $lookup:{
                    from: "customers",
                    localField: "titular",
                    foreignField: "Name",
                    pipeline: [ 
                
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
            {$unwind:"$customers"},
            {$match:{"customers":{$ne:[]}}}
            
            ]).exec();
        
            if(conSimilitudExacta.length){
                console.log('--------------------------------------- : RESULTADO DEL QUERY MARCAPORVENCER');
                console.log(conSimilitudExacta); 
                console.log('--------------------------------------- FIN RESULTADO DEL QUERY MARCAPORVENCER');

                for (let i = 0; i < conSimilitudExacta.length; i++) {
                
                    let dato = new MarcaPorVencer();

                    // // Crea la Marca para obtener el ID que se insertar??
                    // let documents = Object.keys({dato} ).map( key => {
                    //     return new MarcaPorVencer(   {dato}   );
                    //   });

                    // dato._id = documents[0]._id;
                    dato.marcaPorVencerMeses = conSimilitudExacta[i];
                    dato.cantidadPorVencerMeses = 6;
                    dato.fechaPorVencer = conSimilitudExacta[i].fechaVencimientoResolucion;
                    //dato.tipoEstado= "Publicada"; 
                    await MarcaPorVencer.insertMany(dato).then(function(){
                        console.log("Data inserted")  // Success
                        }).catch(function(error){
                            console.log(error)      // Failure
                        });
                }
            }
        }
    }//HASTA AQU?? MARCAS POR VENCER

    //COMIENZA MARCAS SIN PUBLICAR
    if(prueba){
        //COMIENZA MARCAS SIN PUBLICAR : cantidad de marcas sin publicar (ESTADO en tr??mite)
        // y no tienen n??mero de gaceta, 
        let conSimilitudExactaMarcSinPublicar =new Array();

        const marcasBorradasMarcSinPublicar = await MarcaSinPublicar.remove().exec();

        console.log('==================== INICIO marcasBorradas');
        console.log(marcasBorradasMarcSinPublicar);
        console.log('==================== INICIO marcasBorradass');

        //if(true){
        const existeEstadoMarcaSinPublicar = await EstadoMarca.findOne({ nombreEstado: 'En tr??mite' }).exec()

            if(existeEstadoMarcaSinPublicar){
            //dato.estadoMarcaId = existeEstadoMarca._id;
            console.log(existeEstadoMarcaSinPublicar._id);
            }
        //}

        if(existeNumeroSolicitud == null){
            conSimilitudExactaMarcSinPublicar = await Marca.aggregate([
            {
                $match: 
                {
                    //gacetaId: { $exists: false },
                    //tipoEstado:"En tr??mite"
                    //falla- estadoMarcaId:{ $in: [ ObjectId(`${existeEstadoMarca._id}` )]}
                    //falla- estadoMarcaId:{ $in: [ ObjectId(existeEstadoMarca._id)]}
                    
                    $or: [ { gacetaId: { $exists: false } }, { gacetaId: null } ],
                    estadoMarcaId:{ $in: [ existeEstadoMarcaSinPublicar._id]}
                    // se ejecuta pero no carga - estadoMarcaId:{ $in: [ `${existeEstadoMarca._id}` ]}                    
                }
            },
            { 
                $lookup:{
                    from: "customers",
                    localField: "titular",
                    foreignField: "Name",
                    pipeline: [ 
                
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
            {$unwind:"$customers"},
            {$match:{"customers":{$ne:[]}}}
            
            ]).exec();
        
            if(conSimilitudExactaMarcSinPublicar.length){
                console.log('--------------------------------------- : RESULTADO DEL QUERY MARCAPORVENCER');
                console.log(conSimilitudExactaMarcSinPublicar); 
                console.log('--------------------------------------- FIN RESULTADO DEL QUERY MARCAPORVENCER');

                for (let i = 0; i < conSimilitudExactaMarcSinPublicar.length; i++) {
                
                    let dato = new MarcaSinPublicar();

                    // // Crea la Marca para obtener el ID que se insertar??
                    // let documents = Object.keys({dato} ).map( key => {
                    //     return new MarcaPorVencer(   {dato}   );
                    //   });

                    // dato._id = documents[0]._id;
                    dato.marcaSinPublicar = conSimilitudExactaMarcSinPublicar[i];
                    //dato.cantidadPorVencerMeses = 6;
                    //dato.fechaPorVencer = conSimilitudExactaMarcSinPublicar[i].fechaVencimientoResolucion;
                    //dato.tipoEstado= "Publicada"; 
                    await MarcaSinPublicar.insertMany(dato).then(function(){
                        console.log("Data inserted")  // Success
                        }).catch(function(error){
                            console.log(error)      // Failure
                        });
                }
            }
        } 
    }//HASTA AQU?? MARCAS SIN PUBLICAR

    //COMIENZA MARCAS PUBLICADAS
    if(prueba){
    //COMIENZA MARCAS PUBLICADAS :cantidad de marcas publicadas en gaceta (publicadas), 
        //(ESTADO PUBLICADA)
        let conSimilitudExactaMarcaPublicada =new Array();

        const marcasBorradasMarcaPublicada = await MarcaPublicada.remove().exec();

        console.log('==================== INICIO marcasBorradas MarcaPublicadas');
        console.log(marcasBorradasMarcaPublicada);
        console.log('==================== INICIO marcasBorradass MarcaPublicadas');

        //if(true){
            const existeEstadoMarcaPublicada = await EstadoMarca.findOne({ nombreEstado: 'Publicada' }).exec()

            if(existeEstadoMarcaPublicada){
            //dato.estadoMarcaId = existeEstadoMarca._id;
            console.log(existeEstadoMarcaPublicada._id);
            }
        //}

        if(existeNumeroSolicitud == null){
            conSimilitudExactaMarcaPublicada = await Marca.aggregate([
            {
                $match: 
                {
                    gacetaId: { $exists: true },
                    estadoMarcaId:{ $in: [ existeEstadoMarcaPublicada._id]}
                }
            },
            { 
                $lookup:{
                    from: "customers",
                    localField: "titular",
                    foreignField: "Name",
                    pipeline: [ 
                
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
            {$unwind:"$customers"},
            {$match:{"customers":{$ne:[]}}}
            
            ]).exec();
        
            if(conSimilitudExactaMarcaPublicada.length){
                console.log('--------------------------------------- : RESULTADO DEL QUERY MarcaSinPublicar');
                console.log(conSimilitudExactaMarcaPublicada); 
                console.log('--------------------------------------- FIN RESULTADO DEL QUERY MarcaSinPublicar');

                for (let i = 0; i < conSimilitudExactaMarcaPublicada.length; i++) {
                
                    let dato = new MarcaPublicada();

                    // // Crea la Marca para obtener el ID que se insertar??
                    // let documents = Object.keys({dato} ).map( key => {
                    //     return new MarcaPorVencer(   {dato}   );
                    //   });

                    // dato._id = documents[0]._id;
                    dato.marcaPublicada = conSimilitudExactaMarcaPublicada[i];
                    //dato.cantidadPorVencerMeses = 6;
                    //dato.fechaPorVencer = conSimilitudExactaMarcaPublicada[i].fechaVencimientoResolucion;
                    //dato.tipoEstado= "Publicada"; 
                    await MarcaPublicada.insertMany(dato).then(function(){
                        console.log("Data inserted")  // Success
                        }).catch(function(error){
                            console.log(error)      // Failure
                        });
                }
            }
        } 

    }//HASTA AQU?? COMIENZA MARCAS PUBLICADAS
   
    //COMIENZA MARCAS EN OPOSICI??N
    if(prueba){
        //COMIENZA MARCAS OPOSICI??N :cuantas est??n en oposici??n ( que tenga estado Oposici??n).
            let conSimilitudExactaMarcaEnOposicion =new Array();
    
            const marcasBorradasMarcaEnOposicion = await MarcaEnOposicion.remove().exec();
    
            console.log('==================== INICIO marcasBorradas MarcaEnOposicion');
            console.log(marcasBorradasMarcaEnOposicion);
            console.log('==================== INICIO marcasBorradass MarcaEnOposicion');
    
            //if(true){
                const existeEstadoMarcaEnOposicion = await EstadoMarca.findOne({ nombreEstado: 'Oposici??n' }).exec()
    
                if(existeEstadoMarcaEnOposicion){
                //dato.estadoMarcaId = existeEstadoMarca._id;
                console.log(existeEstadoMarcaEnOposicion._id);
                }
            //}
    
            if(existeNumeroSolicitud == null){
                conSimilitudExactaMarcaEnOposicion = await Marca.aggregate([
                {
                    $match: 
                    {
                        gacetaId: { $exists: true },
                        estadoMarcaId:{ $in: [ existeEstadoMarcaEnOposicion._id]}
                    }
                },
                { 
                    $lookup:{
                        from: "customers",
                        localField: "titular",
                        foreignField: "Name",
                        pipeline: [ 
                    
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
                {$unwind:"$customers"},
                {$match:{"customers":{$ne:[]}}}
                
                ]).exec();
            
                if(conSimilitudExactaMarcaEnOposicion.length){
                    console.log('--------------------------------------- : RESULTADO DEL QUERY MarcaEnOposicion');
                    console.log(conSimilitudExactaMarcaEnOposicion); 
                    console.log('--------------------------------------- FIN RESULTADO DEL QUERY MarcaEnOposicion');
    
                    for (let i = 0; i < conSimilitudExactaMarcaEnOposicion.length; i++) {
                    
                        let dato = new MarcaEnOposicion();
    
                        // // Crea la Marca para obtener el ID que se insertar??
                        // let documents = Object.keys({dato} ).map( key => {
                        //     return new MarcaPorVencer(   {dato}   );
                        //   });
    
                        // dato._id = documents[0]._id;
                        dato.marcaEnOposicion = conSimilitudExactaMarcaEnOposicion[i];
                        //dato.cantidadPorVencerMeses = 6;
                        //dato.fechaPorVencer = conSimilitudExactaMarcaPublicada[i].fechaVencimientoResolucion;
                        //dato.tipoEstado= "Publicada"; 
                        await MarcaEnOposicion.insertMany(dato).then(function(){
                            console.log("Data inserted")  // Success
                            }).catch(function(error){
                                console.log(error)      // Failure
                            });
                    }
                }
            } 
    
        }//HASTA AQU?? COMIENZA MARCAS EN OPOSICI??N

        //COMIENZA MARCAS CON RESOLUCI??N
    if(prueba){
        //COMIENZA MARCAS RESOLUCI??N :
        //cantidad de marcas con resoluci??n, ( que tenga n??mero de resoluci??n y que tenga estado REGISTRADA)
            let conSimilitudExactaMarcaConResolucion =new Array();
    
            const marcasBorradasMarcaConResolucion = await MarcaConResolucion.remove().exec();
    
            console.log('==================== INICIO marcasBorradas RESOLUCI??N');
            console.log(marcasBorradasMarcaConResolucion);
            console.log('==================== INICIO marcasBorradass RESOLUCI??N');
    
            //if(true){
                const existeEstadoMarcaConResolucion = await EstadoMarca.findOne({ nombreEstado: 'Registrada' }).exec()
    
                if(existeEstadoMarcaConResolucion){
                //dato.estadoMarcaId = existeEstadoMarca._id;
                console.log(existeEstadoMarcaConResolucion._id);
                }
            //}
    
            if(existeNumeroSolicitud == null){
                conSimilitudExactaMarcaConResolucion = await Marca.aggregate([
                {
                    $match: 
                    {
                        numeroResolucion: { $exists: true },
                        gacetaId: { $exists: true },
                        estadoMarcaId:{ $in: [ existeEstadoMarcaConResolucion._id]}
                    }
                },
                { 
                    $lookup:{
                        from: "customers",
                        localField: "titular",
                        foreignField: "Name",
                        pipeline: [ 
                    
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
                {$unwind:"$customers"},
                {$match:{"customers":{$ne:[]}}}
                
                ]).exec();
            
                if(conSimilitudExactaMarcaConResolucion.length){
                    console.log('--------------------------------------- : RESULTADO DEL QUERY RESOLUCI??N');
                    console.log(conSimilitudExactaMarcaConResolucion); 
                    console.log('--------------------------------------- FIN RESULTADO DEL QUERY RESOLUCI??N');
    
                    for (let i = 0; i < conSimilitudExactaMarcaConResolucion.length; i++) {
                    
                        let dato = new MarcaConResolucion();
    
                        // // Crea la Marca para obtener el ID que se insertar??
                        // let documents = Object.keys({dato} ).map( key => {
                        //     return new MarcaPorVencer(   {dato}   );
                        //   });
    
                        // dato._id = documents[0]._id;
                        dato.marcaConResolucion = conSimilitudExactaMarcaConResolucion[i];
                        //dato.cantidadPorVencerMeses = 6;
                        //dato.fechaPorVencer = conSimilitudExactaMarcaPublicada[i].fechaVencimientoResolucion;
                        //dato.tipoEstado= "Publicada"; 
                        await MarcaConResolucion.insertMany(dato).then(function(){
                            console.log("Data inserted")  // Success
                            }).catch(function(error){
                                console.log(error)      // Failure
                            });
                    }
                }
            } 
    
        }//HASTA AQU?? COMIENZA MARCAS CON RESOLUCI??N

        //COMIENZA MARCAR CLIENTES
    if(pruebaMultiEstado){
        //COMIENZA MARCAR CLIENTES:
        //cantidad de marcas con resoluci??n, ( que tenga n??mero de resoluci??n y que tenga estado REGISTRADA)
    
        console.log('==================== INICIO MARCAR CLIENTES');
    
            let marcarCliente =new Array();
    
              if(existeNumeroSolicitud == null){
                marcarCliente = await Marca.aggregate([
                {
                    $match: 
                    {
                        estadoMarcaId: { $exists: true },
    
                    }
                },
                { 
                    $lookup:{
                        from: "customers",
                        localField: "titular",
                        foreignField: "Name",
                        pipeline: [ 
                    
                        { $match: { Name: { $exists: true } } },
                        ],
                        as: "customers"
                    }                
                },
                {
                    $project:{
                    _id:1,
                    denominacionCompleta:1,
                    titular:1,
                    customers : 1
                }
                },
                {$unwind:"$customers"},
                {$match:{"customers":{$ne:[]}}}
                
                ]).exec();
            
                if(marcarCliente.length){
                    console.log('--------------------------------------- : RESULTADO DEL QUERY RESOLUCI??N');
                    console.log(marcarCliente); 
                    console.log('--------------------------------------- FIN RESULTADO DEL QUERY RESOLUCI??N');
    
                    for (let i = 0; i < marcarCliente.length; i++) {
                    
                        await Marca.updateMany(
                            { 
                            },
                            { $set: {  esCliente: true}}, // item(s) to match from array you want to pull/remove
                            {upsert:false,multi:true}, // set this to true if you want to remove multiple elements.
                        )  
                    }
                }
            } 
    
        }//HASTA AQU?? MARCAR CLIENTES
        if(marcarClientes == 'XXX'){
            //COMIENZA MARCAR CLIENTES:
            //cantidad de marcas con resoluci??n, ( que tenga n??mero de resoluci??n y que tenga estado REGISTRADA)
        
            console.log('==================== INICIO MARCAR CLIENTES');
        
            let marcarCliente =new Array();
    
                if(existeNumeroSolicitud == null){
                marcarCliente = await Marca.aggregate([
                {
                    $match: 
                    {
                        estadoMarcaId: { $exists: true },
    
                    }
                },
                { 
                    $lookup:{
                        from: "customers",
                        localField: "titular",
                        foreignField: "Name",
                        pipeline: [ 
                    
                        { $match: { Name: { $exists: true } } },
                        ],
                        as: "customers"
                    }                
                },
                {
                    $project:{
                    _id:1,
                    denominacionCompleta:1,
                    titular:1,
                    customers : 1
                }
                },
                {$unwind:"$customers"},
                {$match:{"customers":{$ne:[]}}}
                
                ]).exec();
            
                console.log('--------------------------------------- : CANTIDAD DE CLIENTES');
                console.log(marcarCliente.length); 
    
                if(marcarCliente.length){
    
                    for (let i = 0; i < marcarCliente.length; i++) {
                    
                        await Marca.updateMany(
                            { _id : marcarCliente[i]._id 
                            },
                            { $set: {  esCliente: true}}, // item(s) to match from array you want to pull/remove
                            {upsert:false,multi:true}, // set this to true if you want to remove multiple elements.
                        )  
                    }
                }
            } 
        }//HASTA AQU?? MARCAR CLIENTES
    
        //COMIENZA CAMBIARFORMATOFECHA    
        //COMIENZA CAMBIARFORMATOFECHA
        if(cambiarFormatoFecha == 'ejecutarTodas'){
            //COMIENZA MARCAR CLIENTES:
            //cantidad de marcas con resoluci??n, ( que tenga n??mero de resoluci??n y que tenga estado REGISTRADA)
        
            console.log('==================== INICIO cambiarFormatoFecha');
        
            let marcarCliente =new Array();
    
                if(existeNumeroSolicitud == null){
                marcarCliente = await Marca.aggregate([
                     {
                         $match: 
                         {
                             fechaSolicitud: { $exists: true },
                             //_id : mongoose.Types.ObjectId('61a82abad3b59419d9fe98ab')
                             
                             
                         }
                     },
                    
                    // { "$addFields": {
                    //     "fechaSolicitud": { 
                    //         "$dateFromString": {
                    //             "dateString": "$fechaSolicitud",
                    //             "format": "%d/%m/%Y",
                    //             //"format": "%d/%m/%Y %H:%M:%S",
                    //              onError: "$fechaSolicitud"
                    //         }
                    //     }
                    // } }
                
                ]).exec();
            
                console.log('--------------------------------------- : CAMBIARFORMATOFECHAS');
                console.log(marcarCliente.length); 
    
                if(marcarCliente.length){
    
                    console.log('--------------------------------------- : CAMBIARFORMATOFECHAS if(marcarCliente.length){');
                
                    console.log(marcarCliente.length); 
    
                    for (let i = 0; i < marcarCliente.length; i++) {
                        if(marcarCliente[i].fechaSolicitud){
                            if(marcarCliente[i].fechaSolicitud.length > 0){                        
                                console.log(marcarCliente[i].fechaSolicitud);
                                console.log('--------------------------------------- : instanceof String');
                                
                                var mydateSolicitud = null;
    
                                var fechaString = marcarCliente[i].fechaSolicitud
    
                                // console.log(fechaString);
                                // console.log(moment(fechaString, "DD/MM/YYYY", true).isValid())
                                // console.log(moment(fechaString, "DD/MM/YYYY hh:mm:ss", true).isValid())
                                
                                // console.log(moment(fechaString, "DD/MM/YYYY H:mm:ss", true).isValid())
                                // console.log(moment(fechaString, "DD MM YYYY hh:mm:ss", true).isValid())
                                // console.log(moment(fechaString, "DD/MM/YYYY h:mm:ss", true).isValid())
                                
                                // console.log(moment(fechaString, "DD/MM/YYYY H:mm:ss", true).isValid())
                                // console.log(moment(fechaString, "DD/MM/YYYY H:mm:ss", true).isValid())
                                // console.log(moment(fechaString, "DD/MM/YYYY H:mm:ss", true).isValid())
    
                                if(moment(fechaString, "DD/MM/YYYY", true).isValid()){
                                    console.log('--------------------------------------- true : marcarCliente[i].fechaSolicitud, "DD/MM/YYYY", true).isValid()');
                                    console.log(marcarCliente[i].fechaSolicitud);                            
                                    // const fechaString = marcarCliente[i].fechaSolicitud.toString();                        
                                    //let fecha = new Date(fechaString);
                                    console.log('--------------------------------------- : update');                                
                                    var parts =marcarCliente[i].fechaSolicitud.split('/');
                                    // Please pay attention to the month (parts[1]); JavaScript counts months from 0:
                                    // January - 0, February - 1, etc.
                                     mydateSolicitud = new Date(parts[2], parts[1] - 1, parts[0]); 
                                } else
                                if(moment(fechaString, "DD/MM/YYYY H:mm:ss", true).isValid()){
                                    console.log('--------------------------------------- true : marcarCliente[i].fechaSolicitud, "DD/MM/YYYY h:mm:ss", true).isValid()');
                                    console.log(marcarCliente[i].fechaSolicitud);                            
                                    console.log('--------------------------------------- : update');   
                                    
                                    //Dividimos la fecha primero utilizando el espacio para obtener solo la fecha y 
                                    //el tiempo por separado
                                    var splitDate= marcarCliente[i].fechaSolicitud.split(" ");
                                    var date=splitDate[0].split("/");
                                    var time=splitDate[1].split(":");
    
                                    // Obtenemos los campos individuales para todas las partes de la fecha
                                    var dd=date[0];
                                    var mm=date[1]-1;
                                    var yyyy =date[2];
                                    var hh=time[0];
                                    var min=time[1];
                                    var ss=time[2];
    
                                    mydateSolicitud = new Date(yyyy,mm,dd,hh,min,ss);
                                }                        
                                if(mydateSolicitud != null){
    
                                await Marca.updateMany(
                                    { _id : mongoose.Types.ObjectId(`${marcarCliente[i]._id }`)
                                    },
                                    { $set: {  fechaSolicitud: mydateSolicitud
                
                                            //{ $set: {  fechaSolicitud2: new Date(marcarCliente[i].fechaSolicitud) ,
                                            //{ $set: {  fechaSolicitud2: new Date(`${marcarCliente[i].fechaSolicitud}`) , // stringValue: '"Invalid Date"
                                            //{ $set: {  fechaSolicitud2: {$toDate: `${marcarCliente[i].fechaSolicitud}` } , // stringValue: `"{ '$toDate': 'Fri Jan 15 2010 19:00:00 GMT-0500 (Ecuador Time)' }"`,
                                            //{ $set: {  fechaSolicitud2: marcarCliente[i].fechaSolicitud ,    //stringValue: '"16/01/2010 00:00:00"',    
                                            //CastError: Cast to date failed for value "16/01/2010 00:00:00" (type string) at path "fechaSolicitud2"
                                            //{ $set: {  fechaSolicitud2: mongoose.Types.Date(`${marcarCliente[i].fechaSolicitud}`) // TypeError: mongoose.Types.Date is not a function
                                            //{ $set: {  fechaSolicitud2: mongoose.prototype.Date(`${marcarCliente[i].fechaSolicitud}`) //ypeError: Cannot read properties of undefined (reading 'Date')
                                            
                                            
                                            // fechaTitulo: marcarCliente[i].fechaTitulo ,
                                            // fechaVencimientoTitulo: marcarCliente[i].fechaVencimientoTitulo ,
                                            // fechaCreacion: marcarCliente[i].fechaCreacion ,                        
                                            }                                            
                                        }, // item(s) to match from array you want to pull/remove
                                        {upsert:false,multi:true}, // set this to true if you want to remove multiple elements.
                                    ) 
                                    }
                        //}
                        }
                    }
                         
                    }
                }
            } 
        }//HASTA AQU?? CAMBIARFORMATOFECHA
        if(cambiarFormatoFecha == 'ejecutarTodas'){
            //COMIENZA MARCAR CLIENTES:
            //cantidad de marcas con resoluci??n, ( que tenga n??mero de resoluci??n y que tenga estado REGISTRADA)
        
            console.log('==================== INICIO cambiarFormatoFecha');
        
            let marcarCliente =new Array();
    
                if(existeNumeroSolicitud == null){
                marcarCliente = await Marca.aggregate([
                     {
                         $match: 
                         {
                             fechaTitulo: { $exists: true },                              
                             
                         }
                     },
                                
                ]).exec();
            
                console.log('--------------------------------------- : CAMBIARFORMATOFECHAS');
                console.log(marcarCliente.length); 
    
                if(marcarCliente.length){
                
                    console.log(marcarCliente.length); 
    
                    for (let i = 0; i < marcarCliente.length; i++) {
                        if(marcarCliente[i].fechaTitulo){
                            if(marcarCliente[i].fechaTitulo.length > 0){                        
                                console.log(marcarCliente[i].fechaTitulo);
                                console.log('---------------------------------------');
                                
                                var mydateSolicitud = null;
    
                                var fechaString = marcarCliente[i].fechaTitulo
    
                                // console.log(fechaString);
                                // console.log(moment(fechaString, "DD/MM/YYYY", true).isValid())
                                // console.log(moment(fechaString, "DD/MM/YYYY hh:mm:ss", true).isValid())
                                
                                // console.log(moment(fechaString, "DD/MM/YYYY H:mm:ss", true).isValid())
                                // console.log(moment(fechaString, "DD MM YYYY hh:mm:ss", true).isValid())
                                // console.log(moment(fechaString, "DD/MM/YYYY h:mm:ss", true).isValid())
                                
                                // console.log(moment(fechaString, "DD/MM/YYYY H:mm:ss", true).isValid())
                                // console.log(moment(fechaString, "DD/MM/YYYY H:mm:ss", true).isValid())
                                // console.log(moment(fechaString, "DD/MM/YYYY H:mm:ss", true).isValid())
    
                                if(moment(fechaString, "DD/MM/YYYY", true).isValid()){
                                    console.log('--------------------------------------- true : marcarCliente[i].fechaTitulo, "DD/MM/YYYY", true).isValid()');
                                    console.log(marcarCliente[i].fechaTitulo);                            
                                    // const fechaString = marcarCliente[i].fechaTitulo.toString();                        
                                    //let fecha = new Date(fechaString);
                                    console.log('--------------------------------------- : update');                                
                                    var parts =marcarCliente[i].fechaTitulo.split('/');
                                    // Please pay attention to the month (parts[1]); JavaScript counts months from 0:
                                    // January - 0, February - 1, etc.
                                     mydateSolicitud = new Date(parts[2], parts[1] - 1, parts[0]); 
                                } else
                                if(moment(fechaString, "DD/MM/YYYY H:mm:ss", true).isValid()){
                                    console.log('--------------------------------------- true : marcarCliente[i].fechaTitulo, "DD/MM/YYYY h:mm:ss", true).isValid()');
                                    console.log(marcarCliente[i].fechaTitulo);                            
                                    console.log('--------------------------------------- : update');   
                                    
                                    //Dividimos la fecha primero utilizando el espacio para obtener solo la fecha y 
                                    //el tiempo por separado
                                    var splitDate= marcarCliente[i].fechaTitulo.split(" ");
                                    var date=splitDate[0].split("/");
                                    var time=splitDate[1].split(":");
    
                                    // Obtenemos los campos individuales para todas las partes de la fecha
                                    var dd=date[0];
                                    var mm=date[1]-1;
                                    var yyyy =date[2];
                                    var hh=time[0];
                                    var min=time[1];
                                    var ss=time[2];
    
                                    mydateSolicitud = new Date(yyyy,mm,dd,hh,min,ss);
                                }                        
                                if(mydateSolicitud != null){
    
                                await Marca.updateMany(
                                    { _id : mongoose.Types.ObjectId(`${marcarCliente[i]._id }`)
                                    },
                                    { $set: {  fechaTitulo: mydateSolicitud
                
                                            //{ $set: {  fechaSolicitud2: new Date(marcarCliente[i].fechaSolicitud) ,
                                            //{ $set: {  fechaSolicitud2: new Date(`${marcarCliente[i].fechaSolicitud}`) , // stringValue: '"Invalid Date"
                                            //{ $set: {  fechaSolicitud2: {$toDate: `${marcarCliente[i].fechaSolicitud}` } , // stringValue: `"{ '$toDate': 'Fri Jan 15 2010 19:00:00 GMT-0500 (Ecuador Time)' }"`,
                                            //{ $set: {  fechaSolicitud2: marcarCliente[i].fechaSolicitud ,    //stringValue: '"16/01/2010 00:00:00"',    
                                            //CastError: Cast to date failed for value "16/01/2010 00:00:00" (type string) at path "fechaSolicitud2"
                                            //{ $set: {  fechaSolicitud2: mongoose.Types.Date(`${marcarCliente[i].fechaSolicitud}`) // TypeError: mongoose.Types.Date is not a function
                                            //{ $set: {  fechaSolicitud2: mongoose.prototype.Date(`${marcarCliente[i].fechaSolicitud}`) //ypeError: Cannot read properties of undefined (reading 'Date')
                                            
                                            
                                            // fechaTitulo: marcarCliente[i].fechaTitulo ,
                                            // fechaVencimientoTitulo: marcarCliente[i].fechaVencimientoTitulo ,
                                            // fechaCreacion: marcarCliente[i].fechaCreacion ,                        
                                            }                                            
                                        }, // item(s) to match from array you want to pull/remove
                                        {upsert:false,multi:true}, // set this to true if you want to remove multiple elements.
                                    ) 
                                    }
                        //}
                        }
                    }
                         
                    }
                }
            } 
        }//HASTA AQU?? CAMBIARFORMATOFECHA
        if(cambiarFormatoFecha == 'ejecutarTodas'){
            //COMIENZA MARCAR CLIENTES:
            //cantidad de marcas con resoluci??n, ( que tenga n??mero de resoluci??n y que tenga estado REGISTRADA)
        
            console.log('==================== INICIO cambiarFormatoFecha');
        
            let marcarCliente =new Array();
    
                if(existeNumeroSolicitud == null){
                marcarCliente = await Marca.aggregate([
                     {
                         $match: 
                         {
                             fechaCreacion: { $exists: true },                              
                             
                         }
                     },
                                
                ]).exec();
            
                console.log('--------------------------------------- : CAMBIARFORMATOFECHAS');
                console.log(marcarCliente.length); 
    
                if(marcarCliente.length){
                
                    console.log(marcarCliente.length); 
    
                    for (let i = 0; i < marcarCliente.length; i++) {
                        if(marcarCliente[i].fechaCreacion){
                            if(marcarCliente[i].fechaCreacion.length > 0){                        
                                console.log(marcarCliente[i].fechaCreacion);
                                console.log('---------------------------------------');
                                
                                var mydateSolicitud = null;
    
                                var fechaString = marcarCliente[i].fechaCreacion
    
                                // console.log(fechaString);
                                // console.log(moment(fechaString, "DD/MM/YYYY", true).isValid())
                                // console.log(moment(fechaString, "DD/MM/YYYY hh:mm:ss", true).isValid())
                                
                                // console.log(moment(fechaString, "DD/MM/YYYY H:mm:ss", true).isValid())
                                // console.log(moment(fechaString, "DD MM YYYY hh:mm:ss", true).isValid())
                                // console.log(moment(fechaString, "DD/MM/YYYY h:mm:ss", true).isValid())
                                
                                // console.log(moment(fechaString, "DD/MM/YYYY H:mm:ss", true).isValid())
                                // console.log(moment(fechaString, "DD/MM/YYYY H:mm:ss", true).isValid())
                                // console.log(moment(fechaString, "DD/MM/YYYY H:mm:ss", true).isValid())
    
                                if(moment(fechaString, "DD/MM/YYYY", true).isValid()){
                                    console.log('--------------------------------------- true : marcarCliente[i].fechaCreacion, "DD/MM/YYYY", true).isValid()');
                                    console.log(marcarCliente[i].fechaCreacion);                            
                                    // const fechaString = marcarCliente[i].fechaCreacion.toString();                        
                                    //let fecha = new Date(fechaString);
                                    console.log('--------------------------------------- : update');                                
                                    var parts =marcarCliente[i].fechaCreacion.split('/');
                                    // Please pay attention to the month (parts[1]); JavaScript counts months from 0:
                                    // January - 0, February - 1, etc.
                                     mydateSolicitud = new Date(parts[2], parts[1] - 1, parts[0]); 
                                } else
                                if(moment(fechaString, "DD/MM/YYYY H:mm:ss", true).isValid()){
                                    console.log('--------------------------------------- true : marcarCliente[i].fechaCreacion, "DD/MM/YYYY h:mm:ss", true).isValid()');
                                    console.log(marcarCliente[i].fechaCreacion);                            
                                    console.log('--------------------------------------- : update');   
                                    
                                    //Dividimos la fecha primero utilizando el espacio para obtener solo la fecha y 
                                    //el tiempo por separado
                                    var splitDate= marcarCliente[i].fechaCreacion.split(" ");
                                    var date=splitDate[0].split("/");
                                    var time=splitDate[1].split(":");
    
                                    // Obtenemos los campos individuales para todas las partes de la fecha
                                    var dd=date[0];
                                    var mm=date[1]-1;
                                    var yyyy =date[2];
                                    var hh=time[0];
                                    var min=time[1];
                                    var ss=time[2];
    
                                    mydateSolicitud = new Date(yyyy,mm,dd,hh,min,ss);
                                }                        
                                if(mydateSolicitud != null){
    
                                await Marca.updateMany(
                                    { _id : mongoose.Types.ObjectId(`${marcarCliente[i]._id }`)
                                    },
                                    { $set: {  fechaCreacion: mydateSolicitud
                
                                            //{ $set: {  fechaSolicitud2: new Date(marcarCliente[i].fechaSolicitud) ,
                                            //{ $set: {  fechaSolicitud2: new Date(`${marcarCliente[i].fechaSolicitud}`) , // stringValue: '"Invalid Date"
                                            //{ $set: {  fechaSolicitud2: {$toDate: `${marcarCliente[i].fechaSolicitud}` } , // stringValue: `"{ '$toDate': 'Fri Jan 15 2010 19:00:00 GMT-0500 (Ecuador Time)' }"`,
                                            //{ $set: {  fechaSolicitud2: marcarCliente[i].fechaSolicitud ,    //stringValue: '"16/01/2010 00:00:00"',    
                                            //CastError: Cast to date failed for value "16/01/2010 00:00:00" (type string) at path "fechaSolicitud2"
                                            //{ $set: {  fechaSolicitud2: mongoose.Types.Date(`${marcarCliente[i].fechaSolicitud}`) // TypeError: mongoose.Types.Date is not a function
                                            //{ $set: {  fechaSolicitud2: mongoose.prototype.Date(`${marcarCliente[i].fechaSolicitud}`) //ypeError: Cannot read properties of undefined (reading 'Date')
                                            
                                            
                                            // fechaTitulo: marcarCliente[i].fechaTitulo ,
                                            // fechaVencimientoTitulo: marcarCliente[i].fechaVencimientoTitulo ,
                                            // fechaCreacion: marcarCliente[i].fechaCreacion ,                        
                                            }                                            
                                        }, // item(s) to match from array you want to pull/remove
                                        {upsert:false,multi:true}, // set this to true if you want to remove multiple elements.
                                    ) 
                                    }
                        //}
                        }
                    }
                         
                    }
                }
            } 
        }//HASTA AQU?? CAMBIARFORMATOFECHA
        if(cambiarFormatoFecha == 'ejecutarTodas'){
            //COMIENZA MARCAR CLIENTES:
            //cantidad de marcas con resoluci??n, ( que tenga n??mero de resoluci??n y que tenga estado REGISTRADA)
        
            console.log('==================== INICIO cambiarFormatoFecha');
        
            let marcarCliente =new Array();
    
                if(existeNumeroSolicitud == null){
                marcarCliente = await Marca.aggregate([
                     {
                         $match: 
                         {
                             fechaVencimientoTitulo: { $exists: true },                              
                             
                         }
                     },
                                
                ]).exec();
            
                console.log('--------------------------------------- : CAMBIARFORMATOFECHAS');
                console.log(marcarCliente.length); 
    
                if(marcarCliente.length){
                
                    console.log(marcarCliente.length); 
    
                    for (let i = 0; i < marcarCliente.length; i++) {
                        if(marcarCliente[i].fechaVencimientoTitulo){
                            if(marcarCliente[i].fechaVencimientoTitulo.length > 0){                        
                                console.log(marcarCliente[i].fechaVencimientoTitulo);
                                console.log('---------------------------------------');
                                
                                var mydateSolicitud = null;
    
                                var fechaString = marcarCliente[i].fechaVencimientoTitulo
    
                                // console.log(fechaString);
                                // console.log(moment(fechaString, "DD/MM/YYYY", true).isValid())
                                // console.log(moment(fechaString, "DD/MM/YYYY hh:mm:ss", true).isValid())
                                
                                // console.log(moment(fechaString, "DD/MM/YYYY H:mm:ss", true).isValid())
                                // console.log(moment(fechaString, "DD MM YYYY hh:mm:ss", true).isValid())
                                // console.log(moment(fechaString, "DD/MM/YYYY h:mm:ss", true).isValid())
                                
                                // console.log(moment(fechaString, "DD/MM/YYYY H:mm:ss", true).isValid())
                                // console.log(moment(fechaString, "DD/MM/YYYY H:mm:ss", true).isValid())
                                // console.log(moment(fechaString, "DD/MM/YYYY H:mm:ss", true).isValid())
    
                                if(moment(fechaString, "DD/MM/YYYY", true).isValid()){
                                    console.log('--------------------------------------- true : marcarCliente[i].fechaVencimientoTitulo, "DD/MM/YYYY", true).isValid()');
                                    console.log(marcarCliente[i].fechaVencimientoTitulo);                            
                                    // const fechaString = marcarCliente[i].fechaVencimientoTitulo.toString();                        
                                    //let fecha = new Date(fechaString);
                                    console.log('--------------------------------------- : update');                                
                                    var parts =marcarCliente[i].fechaVencimientoTitulo.split('/');
                                    // Please pay attention to the month (parts[1]); JavaScript counts months from 0:
                                    // January - 0, February - 1, etc.
                                     mydateSolicitud = new Date(parts[2], parts[1] - 1, parts[0]); 
                                } else
                                if(moment(fechaString, "DD/MM/YYYY H:mm:ss", true).isValid()){
                                    console.log('--------------------------------------- true : marcarCliente[i].fechaVencimientoTitulo, "DD/MM/YYYY h:mm:ss", true).isValid()');
                                    console.log(marcarCliente[i].fechaVencimientoTitulo);                            
                                    console.log('--------------------------------------- : update');   
                                    
                                    //Dividimos la fecha primero utilizando el espacio para obtener solo la fecha y 
                                    //el tiempo por separado
                                    var splitDate= marcarCliente[i].fechaVencimientoTitulo.split(" ");
                                    var date=splitDate[0].split("/");
                                    var time=splitDate[1].split(":");
    
                                    // Obtenemos los campos individuales para todas las partes de la fecha
                                    var dd=date[0];
                                    var mm=date[1]-1;
                                    var yyyy =date[2];
                                    var hh=time[0];
                                    var min=time[1];
                                    var ss=time[2];
    
                                    mydateSolicitud = new Date(yyyy,mm,dd,hh,min,ss);
                                }                        
                                if(mydateSolicitud != null){
    
                                await Marca.updateMany(
                                    { _id : mongoose.Types.ObjectId(`${marcarCliente[i]._id }`)
                                    },
                                    { $set: {  fechaVencimientoTitulo: mydateSolicitud
                
                                            //{ $set: {  fechaSolicitud2: new Date(marcarCliente[i].fechaSolicitud) ,
                                            //{ $set: {  fechaSolicitud2: new Date(`${marcarCliente[i].fechaSolicitud}`) , // stringValue: '"Invalid Date"
                                            //{ $set: {  fechaSolicitud2: {$toDate: `${marcarCliente[i].fechaSolicitud}` } , // stringValue: `"{ '$toDate': 'Fri Jan 15 2010 19:00:00 GMT-0500 (Ecuador Time)' }"`,
                                            //{ $set: {  fechaSolicitud2: marcarCliente[i].fechaSolicitud ,    //stringValue: '"16/01/2010 00:00:00"',    
                                            //CastError: Cast to date failed for value "16/01/2010 00:00:00" (type string) at path "fechaSolicitud2"
                                            //{ $set: {  fechaSolicitud2: mongoose.Types.Date(`${marcarCliente[i].fechaSolicitud}`) // TypeError: mongoose.Types.Date is not a function
                                            //{ $set: {  fechaSolicitud2: mongoose.prototype.Date(`${marcarCliente[i].fechaSolicitud}`) //ypeError: Cannot read properties of undefined (reading 'Date')
                                            
                                            
                                            // fechaTitulo: marcarCliente[i].fechaTitulo ,
                                            // fechaVencimientoTitulo: marcarCliente[i].fechaVencimientoTitulo ,
                                            // fechaCreacion: marcarCliente[i].fechaCreacion ,                        
                                            }                                            
                                        }, // item(s) to match from array you want to pull/remove
                                        {upsert:false,multi:true}, // set this to true if you want to remove multiple elements.
                                    ) 
                                    }
                        //}
                        }
                    }
                         
                    }
                }
            } 
        }//HASTA AQU?? CAMBIARFORMATOFECHA
        console.log('--------------------------------------- : FIN CAMBIARFORMATOFECHAS');
};