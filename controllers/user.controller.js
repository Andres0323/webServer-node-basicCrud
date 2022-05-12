const { response } = require('express'); // Importacion para cargar la respuesta


const userGet = (req, res = response) => {
    // Si vinieran parametros de segmento opcionales estos llegan en la propiedad query y no hay que hacer nada en rutas
    const params = req.query;

    res.json({
        ok: true,
        msg: 'Controlador de prueba',
        params
    });
}

const userPost = (req, res = response) => {
    const body = req.body; // Se extrae los parametros que llegan aca. NOTA: crear el middleware para poder ver esto


    res.status(201).json({ // EJ de envio de un codigo de estado
        ok: true,
        msg: 'POST ',
        body // Muestro body enviado en parametros
    });
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