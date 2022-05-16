const Role = require('../models/role'); // Traer request de rol

const esRolValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol }); // Si existe esta en BD
    if(!existeRol) {
        throw new Error(`$El rol ${rol} no esta en BD`);
    }
}

module.exports = {
    esRolValido
};