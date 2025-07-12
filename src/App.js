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
const seedCharacters = require('./database/seed.js')

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

    this.middleware();
    this.routes();
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
      pool.connect();
      await seedCharacters();
      
      console.log('Database is ready and connection pool is active.');

      this.app.listen(this.PORT, () => {
        console.log(`Server is running on port http://localhost:${this.PORT}/api`);
        console.log(`API documentation available at http://localhost:${this.PORT}/api/api-docs/`);
      });
    } catch (error) {
      console.error('Error during application startup:', error);
      await pool.disconnect();
      process.exit(1);
    }
  }
}

module.exports = App;