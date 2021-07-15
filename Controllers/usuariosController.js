const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = async(req = request, res = response) => {

   // const { q, nombre = "No nombre", apikey, page = 1, limit } = req.query;

    const { limite = 5, desde = 0 }  = req.query;
    const query = { estado: true };

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        usuarios
    });

/*  //lo comento y o hago de otra manera, con promesas, porque espera que termine una para empezar la otra y eso lo hace tardar
   const usuarios = await Usuario.find( query )
        .skip(Number(desde))
        .limit(Number(limite));

        const total = await Usuario.countDocuments( query );

    res.json({
        total,
        usuarios
    }); //trae todos los usuarios 
    */
}

   const usuariosPost = async(req, res = response) => {

   const { nombre, correo, password, rol } = req.body;
   const usuario = new Usuario( { nombre, correo, password, rol } );

   //encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync( usuario.password, salt );

   await usuario.save();

    res.json({
       usuario
    });
}

const usuariosPut =  async(req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    //todo validar contra base de datos si exise el id
    const usuario = await Usuario.findByIdAndUpdate( id, resto );
    if( password ){
         //encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( usuario.password, salt );
    }

    res.json({
        usuario
    });
}


const usuariosPatch = (req, res = response) => {
    res.json({
       msg: 'usuariosPatch api - Controlador',
    });
}

//solo para cambiar algo y volver a subir
const usuariosDelete = async(req, res = response) => {

    const { id } = req.params;
    const usuario = await Usuario.findByIdAndUpdate ( id, { estado:false } );
    const usuarioAutenticado =  req.usuario;

    // const uid = req.uid;
   
    //para borrar fisicamente
    //const usuario = await Usuario.findByIdAndDelete( id );

    //actualizar  el estado
  
    res.json({ usuario, usuarioAutenticado });
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}
