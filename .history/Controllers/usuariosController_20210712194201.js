const { response } = require('express');

const usuariosGet = (req, res = response) => {
    res.json({
       msg: 'get api - Controlador',
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}