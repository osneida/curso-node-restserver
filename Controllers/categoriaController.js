const { response } = require('express');
const { Categoria } = require('../models');

//obtenerCategorias -  populate ivestigar
//obtenerCategoria -  populate {} ivestigar
//actualizarCategoria
//borrarCategoria actualizar el estado

const crearCategoria = async(req, res = response ) => {
    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre });
    
    if ( categoriaDB ) {
        return res.status(400).json({
            msg: `La categoría ${ categoriaDB.nombre } ya existe`
        });
    }

    //generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria( data );
    await categoria.save();

    res.status(201).json(categoria);
}

const obtenerCategoria = async(req, res = response) => {

   // const query = { estado: true };
    const { id } = req.params;
    const categoria = await Categoria.findById ( id ).populate('usuario', 'nombre');

    if ( !categoria.estado ) {
        return res.status(400).json({
            msg: `La categoría ${ id } NO existe`
        });
    }

    res.json( categoria );
}

const obtenerCategorias = async(req = request, res = response) => {

     const { limite = 5, desde = 0 }  = req.query;
     const query = { estado: true };
 
     const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
         .populate('usuario', 'nombre')
         .skip(Number(desde))
         .limit(Number(limite))
     ]);
 
     res.json({
         total,
         categorias
     });
 }

 const actualizarCategoria =  async(req, res = response) => {

    const { id } = req.params;
    const { _id, estado, usuario, ...resto } = req.body;  //aca quito estado y usuario para evitar que los modifiquen

    resto.nombre=resto.nombre.toUpperCase();
    //todo validar contra base de datos si exise el id
    const categoria = await Categoria.findByIdAndUpdate( id, resto, { new: true } );
   
    res.json({
        categoria
    });
}

const borrarCategoria = async(req, res = response) => {

    const { id } = req.params;
    const categoria = await Categoria.findByIdAndUpdate ( id, { estado:false }, { new: true } );

    res.json({ categoria });
}

module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria

}