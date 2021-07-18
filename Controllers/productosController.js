const { response } = require('express');
const { Producto, Categoria } = require('../models');

const crearProducto = async(req, res = response ) => {

    const { estado, usuario, ...body } = req.body;
    const nombre = req.body.nombre.toUpperCase();

    const productoDB = await Producto.findOne({ nombre });
    
    if ( productoDB ) {
        return res.status(400).json({
            msg: `El producto ${ productoDB.nombre } ya existe`
        });
    }

    //generar la data a guardar
    const data = {
        ...body,
        usuario: req.usuario._id
    }

    const producto = new Producto( data );
    await producto.save();

    res.status(201).json(producto);
}

const obtenerProducto = async(req, res = response) => {

   // const query = { estado: true };
    const { id } = req.params;
    const producto = await Producto.findById ( id ).populate('usuario', 'nombre').populate('categoria', 'nombre');

    if ( !producto.estado ) {
        return res.status(400).json({
            msg: `El Producto ${ id } NO existe`
        });
    }

    res.json( producto );
}

const obtenerProductos = async(req = request, res = response) => {

     const { limite = 5, desde = 0 }  = req.query;
     const query = { estado: true };
 
     const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
         .populate('usuario', 'nombre')
         .populate('categoria', 'nombre')
         .skip(Number(desde))
         .limit(Number(limite))
     ]);
 
     res.json({
         total,
         productos
     });
 }

 const actualizarProducto =  async(req, res = response) => {

    const { id } = req.params;
    const { _id, estado, usuario, ...resto } = req.body;  //aca quito estado y usuario para evitar que los modifiquen

    if( resto.categoria ) { 
        //todo validar contra base de datos si exise el id de la categoria
        const CategoriaDB = resto.categoria ;
            const existeIdCategoria = await Categoria.findById(CategoriaDB);
            if ( !existeIdCategoria ) { 
                return res.status(400).json({
                    msg: `El ID ${ `El ID ${ CategoriaDB } de la Categoría no existe ` } NO existe`
                });
               
            }
    }
    //deberia validar el nombre si cambia, verificar que no exista, al menos que sea el mismo id
    const producto = await Producto.findByIdAndUpdate( id, resto, { new: true } );
   
    res.json({
        producto
    });
}

const borrarProducto = async(req, res = response) => {

    const { id } = req.params;
    const producto = await Producto.findByIdAndUpdate ( id, { estado:false }, { new: true } );

    res.json({ producto });
}

module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto

}