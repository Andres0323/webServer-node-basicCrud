const { response } = require('express'); // Importacion para cargar la respuesta
const bcrypts = require('bcryptjs'); // paquete de npm i bcryptjs para la encriptación de caracteres
const Usuario = require('../models/user'); // importacion de modelo


// Ruta que trae usuarios paginados
const userGet = async (req, res = response) => {
    // Si vinieran parametros de segmento opcionales estos llegan en la propiedad query y no hay que hacer nada en rutas
    // const params = req.query;

    // traera todos los usuarios paginados
    const { limite, desde} = req.query; // Destructuramos valores de la ruta

    // Se hacen peticiones en simultaneo
    const resp = await Promise.all([
        // Sacar el total de registros
       Usuario.countDocuments({ estado: false }), // De esta manera se realiza filtro
       // Busca mediante el modelo los registros
       Usuario.find({ estado: false }) // De esta manera se realiza filtro
        .skip(Number(desde) || 0)
        .limit(Number(limite) || 5) // Se debe pasar en numeros ya que viene como string
    ]);

    const [ total, data ] = resp;

    res.json({
        ok: true,
        total,
        data
    });
}

// Ruta que inserta en BD
const userPost = async (req, res = response) => {   
    // Se destructura solo lo que queremos que se guarde
    const { nombre, correo, password, rol } = req.body; // Se extrae los parametros que llegan aca. NOTA: crear el middleware para poder ver esto
    const usuario = new Usuario( { nombre, correo, password, rol }); // Creo instancia de tipo usuario y se envia objeto que viene

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

// Metodo para actualizar
const userPut = async (req, res = response) => {
// Ver parametros de segmento ( vienen en la ruta como el id )
const id = req.params.id; // se puede tener tantos como se quiera. el nombre debe ser igual al que se pone en la ruta
const { google, password, ...resto } = req.body; // Se extrae los parametros que llegan aca. NOTA: crear el middleware para poder ver esto

// TODO: validar contra BD
if(password) {
    // Como es rebundante se puede hacer un helper
    // Encriptar o hash de contrasena
    const salt = bcrypts.genSaltSync(); // Esto sirve para que tan compleja sea la contrasena para este caso sera 10
    resto.password = bcrypts.hashSync(password, salt); // Encripta en una sola via. se pasan los parametros y ya
}

try {
    // Guardo cambios en BD
    const usuario = await Usuario.findByIdAndUpdate(id, resto); // Trae registro por id y lo actualiza mediante los paramteros enviados


res.status(200).json({ // EJ de envio de un codigo de estado
    msg: 'Usuario actualizado correctamente ',
    usuario
    // body // Muestro body enviado en parametros
});
} catch (e) {
return res.status(400).json({
        msg: e
    });
}
};

const userDelete = async (req, res = response) => {
    const { id } = req.params;

    // Borrar fisicamente
    const usuario = await Usuario.findByIdAndDelete( id );

    // Cambiando el estado para no borrar y que mediante los filtros no se muestre
    // const usuario = await Usuario.findByIdAndUpdate( id ); 

    res.json({
        ok: true,
        msg: 'DELETE  de usuario',
        usuario
    });
};

// Exportacion de los metodos del controlador 
module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete
};