const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const { generarJWT } = require('../helpers/generar-jwt'); 

const login = async( req, res = response ) => {

    const { correo, password } = req.body;

    try {
       
        //verificar si el correo existe
        const usuario = await Usuario.findOne({ correo });
        if( !usuario ){
            return res.status(400).json({
                msg: "Usuario / Password no son correctos"
            });
        }

        //verificars si el usuario esta activo
        if( !usuario.estado ){
            return res.status(400).json({
                msg: "Usuario / Password no son correctos - estado: false"
            });
        }

        //verificar la contraseña
        const validarPasswor = bcryptjs.compareSync( password, usuario.password );
        if( !validarPasswor ){
            return res.status(400).json({
                msg: "Usuario / Password no son correctos - estado: false"
            });
        }

        //generar el token
        const token = await generarJWT( usuario.id );

        res.json({
           token,
           usuario
        })

    } catch (error) {
        console.log( error )
        return res.status(500).json( {
            msg:'hable con el administrador'
        } )
    }

  
}

module.exports = {
    login
}