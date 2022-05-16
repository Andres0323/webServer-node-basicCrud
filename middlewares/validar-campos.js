
const { validationResult } = require('express-validator');

const validarCampos = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty) {
        res.status(400).json(errors); // si existen errores se cambia y termina la ejecucion
    }

    next(); // Si todo sale bn seguira con el siguiente middleware a menos que no haya ninguno

}

module.exports = { validarCampos }