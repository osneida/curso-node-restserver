
const express = require('express');
const cors = require('cors'); //para indicar cuales paginas pueden tener acceso a la aplicacion o no
const { dbConnection } = require('../database/config');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth:       '/api/auth',
            categorias: '/api/categorias',
            usuarios:   '/api/usuarios'
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
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.usuarios, require('../routes/usuarios'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port);
        });
    }
}

module.exports = Server;