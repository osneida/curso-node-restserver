const Role = require('../models/role');
const { Usuario, Categoria, Producto } = require('../models');


const esRoleValido = async(rol = '') => {

    const existeRol = await Role.findOne({ rol });
    if ( !existeRol ) {
        throw new Error(  `El rol ${ rol } no está registrado en la BD` )
    }
}

const emailExiste = async(correo = '') =>{

    const existeEmail = await Usuario.findOne({ correo });
    if ( existeEmail ) { 
        throw new Error(  `El correo ${ correo } ya está registrado ` )
    }
}

const existeUsuarioPorId = async( id ) =>{

    const existeIdUsuario = await Usuario.findById(id);
    if ( !existeIdUsuario ) { 
        throw new Error(  `El ID ${ id } no existe ` )
    }
}


const existeCategoriaPorId = async( id ) =>{

    const existeIdCategoria = await Categoria.findById(id);
    if ( !existeIdCategoria ) { 
        throw new Error(  `El ID ${ id } de la Categoría no existe ` )
    }
}

const existeProductoPorId = async( id ) =>{

    const existeIdProducto = await Producto.findById(id);
    if ( !existeIdProducto ) { 
        throw new Error(  `El ID ${ id } no existe ` )
    }
}

/**
 * validar colecciones
 */

const coleccionesPermitidos = ( coleccion = '', colecciones = []) =>{

        const incluida = colecciones.includes( coleccion );
        if (!incluida ) {
            throw new Error(`La colección ${ coleccion } no es perimitidas `)
        }
        return true;
}


module.exports = {
    esRoleValido, 
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId,
    coleccionesPermitidos
};