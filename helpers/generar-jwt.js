const jwt = require("jsonwebtoken");

const generarJWT = ( uid='' ) => {
    return new Promise( (resolve, reject) => {
        const payload = ( uid );

        jwt.sign( payload, process.env.SECRETORPRIVATEKE, 
            //le quite porque no encontre la solucion {  expiresIn 1440 }, 
            //Error: invalid expiresIn option for string payload
            ( err, token ) => { 
            if ( err ) {
                console.log(err);
                reject( 'No se pudo generar el token' )
            } else {
                resolve( token );
            }
        })
    })
}



module.exports = {
    generarJWT
}