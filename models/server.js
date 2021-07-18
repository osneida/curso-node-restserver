
const express = require('express');
const cors = require('cors'); //para indicar cuales paginas pueden tener acceso a la aplicacion o no
const fileUpload = require('express-fileupload');

const { dbConnection } = require('../database/config');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth:       '/api/auth',
            buscar:     '/api/buscar',
            categorias: '/api/categorias',
            productos:  '/api/productos',
            usuarios:   '/api/usuarios',
            uploads:    '/api/uploads'
        }
       
        //conectar a base de datos
        this.connectarBD();

        //middlewares
        this.middlewares();

        //rutas
        this.routes();
    }

    async connectarBD() {
        await dbConnection();
    }

    middlewares() {

        this.app.use( cors() );

        //lectura y parseo del body
        this.app.use( express.json() );

        this.app.use( express.static('public') );

        //para el manejo de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true //esto crea la carpeta donde se guarda si no existe, se puede manejar o no, mejor tener carpetas fijas
        }));
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.buscar, require('../routes/buscar'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.productos, require('../routes/productos'));
        this.app.use(this.paths.usuarios, require('../routes/usuarios'));
        this.app.use(this.paths.uploads, require('../routes/uploads'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port);
        });
    }
}

module.exports = Server;