const express = require('express');
const dotenv = require('dotenv');
const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();


const pool = require('./database/Pool/Pool.js');
const menu = require('./services/menu.js');


(async () => {
  try {
    await pool.connect();
    console.log('Database synchronized successfully.');
    
    const Menu = new menu();
    await Menu.menuPrincipal();
    
    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error during server startup:', error);
    await pool.disconnect(); // Ensure to close the database connection on error
  }
})();

