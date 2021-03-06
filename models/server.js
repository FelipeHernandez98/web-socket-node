require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { socketControler } = require('../sockets/controller');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);

        this.paths = {}
    
        // Middlewares
        this.middlewares();

        //Rutas de mi app
        this.routes();

        // Config sockets
        this.sockets();
    }

    middlewares(){

        //CORS
        this.app.use(cors());
        
        //Directorio publico
        this.app.use(express.static('public'));

    }

    routes() {
        //this.app.use(this.paths.auth, require('../routes/auth.routes'));
    }

    sockets() {
        this.io.on('connection', socketControler);
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        })
    }
}

module.exports = Server;