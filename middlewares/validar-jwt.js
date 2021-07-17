const { request, response } = require("express");
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const validarJWT = async(req = request, res=response, next) => {

    const token = req.header('x-token');
    if( !token ){
        return res.status(401).json({
            msg: 'No hay token en la petición'
        })
    }

    try {

        const uid = jwt.verify(token, process.env.SECRETORPRIVATEKE);
      //  req.uid = uid;
        const usuario = await Usuario.findById( uid );
        //veriicar que el usuario exista

        if( !usuario){
            return res.status(401).json({
                msg: 'Token no Válido - usuario no existe en la BD'
            })
        }

        //verificar que el usuario tenga estado true

        if( !usuario.estado){
            return res.status(401).json({
                msg: 'Token no Válido - usuario estado false'
            })
        }

        req.usuario =  usuario;

        next();
    } catch (error) {
        res.status(401).json({
            msg: 'token no Válido'
        })
    }


   
    
}

module.exports = {
    validarJWT
}
