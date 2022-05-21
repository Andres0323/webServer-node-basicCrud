const Role = require('../models/role'); // Traer request de rol
const Usuario = require('../models/user'); // importacion de modelo

// Validar Rol
const esRolValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol }); // Si existe esta en BD
    if(!existeRol) {
        throw new Error(`$El rol ${rol} no esta en BD`);
    }
}

// Validar si existe el correo
const existeEmail = async (correo = '') => {
    const existeEmail = await Usuario.findOne({ correo }); // Si existe esta en BD
    if(!existeEmail) {
        throw new Error(`$El correo: ${correo} ya existe en BD`);
    }
}

// Validar si existe el usuario
const existeUsuarioId = async (id) => {
    const existeUsuario = await Usuario.findById(id); // Si existe esta en BD
    if(!existeUsuario) {
        throw new Error(`$El usuarioId: ${id} ya existe en BD`);
    }
}


module.exports = {
    esRolValido,
    existeEmail,
    existeUsuarioId
};