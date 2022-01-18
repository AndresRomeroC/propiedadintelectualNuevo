const  { MarcaSchema, Marca } = require('../../models/Marca/marca.entity');
const  { MarcaPorVencerSchema, MarcaPorVencer } = require('../../models/MarcaPorVencer/marcaPorVencer.entity');
const  { MarcaSinPublicarSchema, MarcaSinPublicar } = require('../../models/MarcaSinPublicar/marcaSinPublicar.entity');
const  { MarcaPublicadaSchema, MarcaPublicada } = require('../../models/MarcaPublicada/marcaPublicada.entity');
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

                    // // Crea la Marca para obtener el ID que se insertará
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
    }//HASTA AQUÍ MARCAS POR VENCER

    //COMIENZA MARCAS SIN PUBLICAR
    if(prueba){
        //COMIENZA MARCAS SIN PUBLICAR : cantidad de marcas sin publicar (ESTADO en trámite)
        // y no tienen número de gaceta, 
        let conSimilitudExactaMarcSinPublicar =new Array();

        const marcasBorradasMarcSinPublicar = await MarcaSinPublicar.remove().exec();

        console.log('==================== INICIO marcasBorradas');
        console.log(marcasBorradasMarcSinPublicar);
        console.log('==================== INICIO marcasBorradass');

        //if(true){
        const existeEstadoMarcaSinPublicar = await EstadoMarca.findOne({ nombreEstado: 'En trámite' }).exec()

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
                    gacetaId: { $exists: false },
                    //tipoEstado:"En trámite"
                    //falla- estadoMarcaId:{ $in: [ ObjectId(`${existeEstadoMarca._id}` )]}
                    //falla- estadoMarcaId:{ $in: [ ObjectId(existeEstadoMarca._id)]}
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

                    // // Crea la Marca para obtener el ID que se insertará
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
    }//HASTA AQUÍ MARCAS SIN PUBLICAR

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

                    // // Crea la Marca para obtener el ID que se insertará
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

    }//HASTA AQUÍ COMIENZA MARCAS PUBLICADAS
};