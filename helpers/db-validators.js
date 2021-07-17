const Role = require('../models/role');
const { Usuario, Categoria } = require('../models');


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
        throw new Error(  `El ID ${ id } no existe ` )
    }
}


module.exports = {
    esRoleValido, 
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId
};