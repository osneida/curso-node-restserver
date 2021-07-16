const { response } = require('express');
const bcryptjs = require('bcryptjs');


const Usuario = require('../models/usuario');

const { generarJWT } = require('../helpers/generar-jwt'); 
const { googleVerify } = require('../helpers/google-verify');

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

const googleSignin = async(req, res = response) => {

    const { id_token } = req.body;
    
        const { correo, nombre, img } = await googleVerify( id_token ); //googleUser desestructuro el googleUser

        //crear usuario en BD con los datos google googleUser
        //usuario se está registrando con el usuario google
        try {
            let   usuario = await Usuario.findOne({ correo });
    
            if( !usuario ){
                //si no existe el usuario lo creo
                const data = { 
                    nombre,
                    correo,
                    password: ':P',
                    img,
                    google: true
                };

                usuario = new Usuario ( data );
                await usuario.save();
            }

            //reviso que el estado este en false
            if ( !usuario.estado ){
                return res.status(401).json({
                    msg: 'Hable con el administrador, Usuario bloqueado'
                });
            }

            //generar el token
            const token = await generarJWT( usuario.id );

            res.json({
                usuario,
                token
            //  msg: 'Todo ok google signin',
            //   googleUser
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                msg: 'Hable con el administrador'
            });
        }   
    
}

module.exports = {
    login,
    googleSignin
}