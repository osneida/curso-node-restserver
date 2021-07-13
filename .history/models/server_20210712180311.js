
const express = require('express')

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        //middlewares
        this.middlewares();

        //rutas
        this.routes();
    }

    middlewares() {

        this.app.use( express.static('public') );
    }

    routes() {

        this.app.get('/api ', (req, res) => {
            res.json({
               mes: 'get api',
            });
          });

          this.app.get('/api ', (req, res) => {
            res.json({
                mes: 'put api',
            });
          });

          this.app.get('/api ', (req, res) => {
            res.json({
                mes: 'post api',
            });
          });

          this.app.get('/api ', (req, res) => {
            res.json({
                mes: 'delete api',
            });
          });
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port);
        });
    }
}

module.exports = Server;