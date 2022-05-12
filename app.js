require('dotenv').config(); // Importo variables de entorno luego de haber instalado en .env
const Server = require('./models/server'); // Importo el server para hacer una instancia

const server = new Server(); // creo instancia del servidor

server.listen();

