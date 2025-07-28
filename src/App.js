require('dotenv').config();
const express = require('express');
const cors = require('cors');

const {
  userRoutes,
  messageRoutes,
  chatRoutes,
  historicalRoutes,
  characterRoutes
} = require('./routes/index.js');

const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('../docs/swagger.js');

const pool = require('./database/Pool/Pool.js');
const migrate = require('./database/migrate.js');
const ErrorHandler = require('./service/error/errorHandler');


class App {
  constructor() {
    this.app = express();
    this.cors = cors({
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization']
    });
    this.PORT = process.env.PORT;
    this.swaggerUi = swaggerUi;
    this.swaggerDocs = swaggerDocs;

    this.app.use(express.static('../public'));
    
    this.middleware();
    this.routes();
    
    this.app.use((req, res, next) => {
      res.status(404).sendFile('/public/404.html');
    });
    this.app.use(ErrorHandler);
  }

  middleware() {
    this.app.use(express.json());
    this.app.use(this.cors);
    this.app.use('/api/api-docs', this.swaggerUi.serve, this.swaggerUi.setup(this.swaggerDocs));
  }

  routes() {
    this.app.use('/api', userRoutes);
    this.app.use('/api', messageRoutes);
    this.app.use('/api', chatRoutes);
    this.app.use('/api', historicalRoutes);
    this.app.use('/api', characterRoutes);
  }

  async start() {
    try {
      await migrate();
      
      this.app.listen(this.PORT, () => {
      	console.log('Server is running!');
      });
    } catch (error) {
      console.error('Error during application startup:', error);
      await pool.disconnect();
      process.exit(1);
    }
  }
}

module.exports = App;
