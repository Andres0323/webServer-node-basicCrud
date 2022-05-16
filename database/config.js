
const mongoose = require('mongoose'); // Se importa mongoose despues de haber sido instalado

// Se crea variable de coneccion a BD
const dbConnection = async() => {
    try {
        // Conexion
       await mongoose.connect(process.env.MONGOBD_ATLAS, {
            useNewUrlParser: true,
            useUnifiedTopology: true
            // useCreateIndex: true,
            // useFindAndModify: false
        });

        console.log('BD conectada');
        
    } catch (e) {
        console.log(e);
        throw new Error('Error al iniciar la conexión');
    }

}

// ùede que exista varias conexiones
module.exports = { dbConnection };