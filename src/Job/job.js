const  { MarcaSchema, Marca } = require('../../models/Marca/marca.entity');
const  { MarcaPorVencerSchema, MarcaPorVencer } = require('../../models/MarcaPorVencer/marcaPorVencer.entity');

const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));

exports.job = async () => {
 

    const existeNumeroSolicitud = null;//await Marca.findOne({ numeroSolicitud :  dato}).exec();

    console.log('--------------------------------------- : existeNumeroSolicitud');
    console.log(existeNumeroSolicitud);
    console.log('--------------------------------------- : fin existeNumeroSolicitud');

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
            console.log('--------------------------------------- : RESULTADO DEL QUERY conSimilitudExacta');
            console.log(conSimilitudExacta); 
            console.log('--------------------------------------- FIN RESULTADO DEL QUERY conSimilitudExacta');

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
};
