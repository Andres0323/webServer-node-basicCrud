
const { Router } = require('express'); // se desctructura esta propiedad para crear una instancia de ella
const {
    userGet, userPost, userPut, userDelete,
} = require('../controllers/user.controller'); // se carga el controlador a llamar

const router = Router();


// Rutas
// Se independiza a un controlador

router.get('/', userGet); // se llama el contolador mediante el path

router.post('/', userPost);

router.put('/:id', userPut); // De manera dinamica se saca el parametro de segmento

router.delete('/:id', userDelete);

module.exports = router;