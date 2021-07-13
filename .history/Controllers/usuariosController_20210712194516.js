const { response } = require('express');

const usuariosGet = (req, res = response) => {
    res.json({
       msg: 'get api - Controlador',
    });
}

const usuariosPost = (req, res = response) => {
    res.json({
       msg: 'usuariosPost api - Controlador',
    });
}

const usuariosPut = (req, res = response) => {
    res.json({
       msg: 'usuariosPut api - Controlador',
    });
}


const usuariosPatch = (req, res = response) => {
    res.json({
       msg: 'usuariosPatch api - Controlador',
    });
}


const usuariosDelete = (req, res = response) => {
    res.json({
       msg: 'usuariosDelete api - Controlador',
    });
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}
