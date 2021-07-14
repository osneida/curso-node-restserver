
const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({

    nombre:{
        type: String,
        required:[true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required:[true, 'El corre es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required:[true, 'La contraseña es obligatorio']
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required:[true, 'El  rol es obligatorio'],
      //  enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

UsuarioSchema.methods.toJSON = function() {
    const { __v, password, ...usuario } = this.toObject();
    return usuario;
}  //para quitar en lo que muestra la version y el password

module.exports = model('Usuario', UsuarioSchema );