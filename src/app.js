import express from 'express';
import routes from './routes';
import './database';

require('dotenv').config();

// configuração da estrutura da app, registros d;
class App {
    constructor() {
        this.server = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(express.json());
    }

    routes() {
        this.server.use(routes);
    }
}

export default new App().server;
