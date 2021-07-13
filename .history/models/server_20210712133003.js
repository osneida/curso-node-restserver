const express = require('express')

class Server {

    constructor(){
        this.app = express();
        this.routes();
    }

    routes() {
        this.app.get('/', (req, res) => {
            res.send('Hello World');
          })
    }
}

module.exports = Server;