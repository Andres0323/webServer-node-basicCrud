const express = require('express');
const cors = require('cors'); // ambas importacioones se tienen que instalar de npm
const { dbConnection } = require('../database/config'); // importacion de metodo de conecion

class Server {

    constructor() {
        this.app = express(); // Creo la propiedad de express
        this.port = process.env.PORT; // Se carga el puerto de manera dinaica
        this.usuariosPath = '/api/usuarios'; // Ruta relativa, se puede manejar desde endpoints

        // Conectar a BD
        this.conectarBD();

        // Middlwares
        // Son funciones que van a adjuntar otra funcionalidad al webserver
        this.middlewares();

        // se cargan las rutas
        this.routes();
    }

    // Metodo de conexion a BD
    async conectarBD() {
        await dbConnection(); // Se llama la funcionalidad para conectar a la BD
    }

    middlewares() {

        // CORS
        this.app.use(cors());

        // Parse y lectura de body en metodos
        this.app.use(express.json()); // para recibir los parametros que vienen por ejemplo en un post

        // Directorio publico
        this.app.use(express.static('public')); // publicar el directorio
    }

    // Se definen las rutas que se van a manejar
    routes() {
        // Ruta de prueba
        this.app.get('/prueba', (req, res) => {
            res.send('Hello World');
          });

          // Peticiones GET, POST, PUT, DELETE, PATCH

          // EJEMPLO DE RESPUESTA
        //   this.app.get('/pruebametodos', (req, res) => {
        //     res.json({
        //         ok: true,
        //         msg: 'API de prueba'
        //     });
        //   });

        // Se independizo las rutas entonces se crea un middleware de rutas asi
        // Este es el nuevo path y en las rutas iria el / o acompañado de alguna extension
        this.app.use(this.usuariosPath, require('../routes/user.routes')); // l patch al que haga match seleccionara el middlware correcto en caso de existir mas

    }

    // Metodo de escucha de puerto
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto: ', this.port);
        });
    }
}

module.exports = Server;