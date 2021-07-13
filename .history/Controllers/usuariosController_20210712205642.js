const { response } = require('express');

const usuariosGet = (req, res = response) => {
    res.json({
       msg: 'get api - Controlador',
    });
}

const usuariosPost = (req, res = response) => {

    const { nombre, edad } = req.body;
    res.json({
       msg: 'usuariosPost api - Controlador',
       nombre, 
       edad
    });
}

const usuariosPut = (req, res = response) => {

    const id = req.id;
    res.json({
       msg: 'usuariosPut api - Controlador',
       id
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
