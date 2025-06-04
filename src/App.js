require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

const routes = require('./routes.js');
const pool = require('./database/Pool/Pool.js');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('../docs/swagger.js');

app.use(express.json());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use('/api', routes);
app.use('/api/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


(async () => {
  try {
    await pool.connect();
    console.log('Database synchronized successfully.');
    
    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
      console.log(`API documentation available at http://localhost:${PORT}/api/api-docs/`);
    });
  } catch (error) {
    console.error('Error during server startup:', error);
    await pool.disconnect(); // Ensure to close the database connection on error
  }
})();

