const express = require('express');
const dotenv = require('dotenv');
const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();

const routes = require('./routes.js');
const pool = require('./database/Pool/Pool.js');

app.use(express.json());
app.use('/api', routes);

(async () => {
  try {
    await pool.connect();
    console.log('Database synchronized successfully.');
    
    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error during server startup:', error);
    await pool.disconnect(); // Ensure to close the database connection on error
  }
})();

