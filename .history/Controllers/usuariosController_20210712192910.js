const { response } = require('express');

const usuariosGet = (req, res = response) => {
    res.json({
       mess: 'get api - Controlador',
    });
}

module.exports = {
    usuariosGet
}