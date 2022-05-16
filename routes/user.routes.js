
const { Router } = require('express'); // se desctructura esta propiedad para crear una instancia de ella
const { check  } = require('express-validator'); // npm i express-validator para traer este validador
const { validarCampos } = require('../middlewares/validar-campos'); // importamos nuestro middleware
const {
    userGet, userPost, userPut, userDelete,
} = require('../controllers/user.controller'); // se carga el controlador a llamar
const { esRolValido } = require('../helpers/db-validators');

const router = Router();


// Rutas
// Se independiza a un controlador

router.get('/', userGet); // se llama el contolador mediante el path

router.post('/', [
    // Ejemplos de como validar campos sin base de datos
    check('correo', 'El correo no es valido').isEmail(), // es un middleware para validar algun campo
    check('nombre', 'El campo no es valido').not().isEmpty(),
    check('password', 'El campo es obligatorio y mas de 6 letras').isLength({ min: 6 }),
    // check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),

    // Validacion en BD
    check('rol').custom( esRolValido ), // Se trae de helpers
    validarCampos
], userPost);

router.put('/:id', userPut); // De manera dinamica se saca el parametro de segmento

router.delete('/:id', userDelete);

module.exports = router;