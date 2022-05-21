

// Importacion de mongoose
const { Schema, model } = require('mongoose');

// Ejemplo de modelo en Node basado en mongoose
const UserSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El campo es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El campo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El campo es obligatorio']
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE'] // Ejemplo si de algun lado pudieramos extraer roles
    },
    eatado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: true
    }
});

// Sbreescribir el modelo. Se hace para devolver en las respuesta el valor que se desea

UserSchema.methods.toJSON = function() {
    const { __v, password, ...rest } = this.toObject();
    return rest;
}

module.exports = model('User', UserSchema); // El string debe de ser en singular ya que mongoose adjunta una S al final