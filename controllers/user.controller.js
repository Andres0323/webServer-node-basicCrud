const { response } = require('express'); // Importacion para cargar la respuesta
const bcrypts = require('bcryptjs'); // paquete de npm i bcryptjs para la encriptación de caracteres
const Usuario = require('../models/user'); // importacion de modelo


const userGet = (req, res = response) => {
    // Si vinieran parametros de segmento opcionales estos llegan en la propiedad query y no hay que hacer nada en rutas
    const params = req.query;

    res.json({
        ok: true,
        msg: 'Controlador de prueba',
        params
    });
}

// Ruta que inserta en BD
const userPost = async (req, res = response) => {   
    // Se destructura solo lo que queremos que se guarde
    const { nombre, correo, password, rol } = req.body; // Se extrae los parametros que llegan aca. NOTA: crear el middleware para poder ver esto
    const usuario = new Usuario( { nombre, correo, password, rol }); // Creo instancia de tipo usuario y se envia objeto que viene

    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        return res.status(400).json({
            msg: 'El correo ya existe'
        });
    }

    // Encriptar o hash de contrasena
    const salt = bcrypts.genSaltSync(); // Esto sirve para que tan compleja sea la contrasena para este caso sera 10
    usuario.password = bcrypts.hashSync(password, salt); // Encripta en una sola via. se pasan los parametros y ya

    try {
        // Guardo cambios en BD
    await usuario.save();


    res.status(201).json({ // EJ de envio de un codigo de estado
        ok: true,
        msg: 'Usuario creado correctamente ',
        usuario
        // body // Muestro body enviado en parametros
    });
} catch (e) {
    return res.status(400).json({
        msg: e
    });
}
};

const userPut = (req, res = response) => {
// Ver parametros de segmento ( vienen en la ruta como el id )
const id = req.params.id; // se puede tener tantos como se quiera. el nombre debe ser igual al que se pone en la ruta

    res.json({
        ok: true,
        msg: 'PUT ',
        id
    });
};

const userDelete = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'DELETE '
    });
};

// Exportacion de los metodos del controlador 
module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete
};