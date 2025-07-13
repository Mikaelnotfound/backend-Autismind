const express = require('express');
const cors = require('cors');

const userRoutes = require('./routes/users');
const messageRoutes = require('./routes/message');
const chatRoutes = require('./routes/chats');
const characterRoutes = require('./routes/character'); 

const pool = require('./database/Pool/Pool.js');

const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('../docs/swagger.js'); 

const errorHandler = require('./utils/error/errorHandler.js');

class App {
  constructor() {
    this.app = express();
    this.cors = cors({
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization']
    });
    this.swaggerUi = swaggerUi;
    this.swaggerDocs = swaggerDocs;

    this.middleware();
    this.routes();

    this.app.use(errorHandler);
  }

  middleware() {
    this.app.use(express.json());
    this.app.use(this.cors);
    this.app.use('/api/api-docs', this.swaggerUi.serve, this.swaggerUi.setup(this.swaggerDocs));
  }

  routes() {
    this.app.get('/status', (req, res) => {
      res.status(200).json({ message: "Server is running" });
    });
    this.app.use('/api/users', userRoutes);
    this.app.use('/api/messages', messageRoutes);
    this.app.use('/api/chats', chatRoutes);
    this.app.use('/api/characters', characterRoutes);
  }
}

module.exports = new App().app;
