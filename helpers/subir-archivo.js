const path = require( 'path' );
const { v4: uuidv4 } =  require('uuid');

const subirArchivo = ( files, extensionesValidad = ['png','jpg','jpeg','gif'], carperta ='' ) =>{

    return new Promise ( (resolve, reject) => {

        const { archivo } = files;
        const nombreCorto = archivo.name.split('.');
        const extension = nombreCorto[ nombreCorto.length -1 ];
    
        //validar extension

        if (!extensionesValidad.includes( extension )){
            return reject( `La extension ${ extension } no es permitida, debe ser ${ extensionesValidad } `);
        }
    
        const nombreTemp = uuidv4() + '.' + extension;
    
        const uploadPath = path.join( __dirname, '../uploads/', carperta, nombreTemp );
      
        archivo.mv(uploadPath, (err) => {
          if (err) {
            return reject( err );
          }
      
          resolve( nombreTemp );
        });

    });



}

module.exports = {
    subirArchivo
}