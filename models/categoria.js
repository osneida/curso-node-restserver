

const { Schema, model } = require('mongoose');

const CategoriaSchema = Schema({

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
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }

});

CategoriaSchema.methods.toJSON = function() {
    const { __v, estado, ...data } = this.toObject();
 //   categorias.uid = _id;
    return data;
}  //para quitar en lo que muestra la version y el password


module.exports = model( 'Categoria', CategoriaSchema);