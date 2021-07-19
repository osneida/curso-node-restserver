

const { Schema, model } = require('mongoose');

const ProductoSchema = Schema({

    nombre: {
        type: String,
        unique: true,
        required: [true, 'El nombre es obligatorio']
    },
    estado: {
        type: Boolean,
        default: true,
        required: [true, 'El estado es obligatorio']
    },
    precio: {
        type:Number,
        default:0
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    descripcion: { 
        type: String
    },
    disponible:{
        type:Boolean,
        default: true
    },
    img: { type: String },

});

ProductoSchema.methods.toJSON = function() {
    const { __v, estado, ...data } = this.toObject();
    return data;
}  //para quitar en lo que muestra la version y el password


module.exports = model( 'Producto', ProductoSchema);