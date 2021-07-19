const path = require('path');
const fs = require('fs');

const { response } = require('express');
const { subirArchivo } = require('../helpers/subir-archivo');

const { Usuario, Producto } = require('../models');

const cargarArchivo = async(req, res = response ) => {

    try {
        const nombre = await subirArchivo( req.files, ['txt','md'], 'textos' );
         res.json({ nombre });  

    } catch (msg) {
        res.status(400).json({ msg });
    }

  
}

const actualizarImagen = async(req, res = response) => {
    
    const { id, coleccion } = req.params;

    let modelo;

    switch ( coleccion ) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo ){
                return res.status(400).json({
                    msg: `No existe un usuario con el id  ${ id } `
                });
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo ){
                return res.status(400).json({
                    msg: `No existe un Producto con el id  ${ id } `
                });
            }
            break;
        default:
            return res.status(500).json({ msg: 'Se me olvidó validar esto' });
            break;
    }
     

    //limpiar la imagen del servidor
    if ( modelo.img ) {
        //hay que borrar la imagen del servidor
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
        if ( fs.existsSync( pathImagen ) ) {
            fs.unlinkSync ( pathImagen );
        }
    }


    const nombre = await subirArchivo( req.files, undefined, coleccion);
    modelo.img = nombre;

    await modelo.save();


    res.json( modelo );
}

const mostrarImagen =  async( req, res = response ) => {

    const { id, coleccion } = req.params;

    let modelo;

    switch ( coleccion ) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo ){
                return res.status(400).json({
                    msg: `No existe un usuario con el id  ${ id } `
                });
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo ){
                return res.status(400).json({
                    msg: `No existe un Producto con el id  ${ id } `
                });
            }
            break;
        default:
            return res.status(500).json({ msg: 'Se me olvidó validar esto' });
            break;
    }
     
    if ( modelo.img ) {
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
        if ( fs.existsSync( pathImagen ) ) {
            return res.sendFile( pathImagen )
        }
    }

    const pathImagen = path.join(__dirname, '../assets/no-image.jpg');
    return res.sendFile( pathImagen )
   // res.json({ msg: 'falta place holder ' });

}

module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImagen
} 