const express = require('express');
const dotenv = require('dotenv');
const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();


const DB = require('./database/DB/dbConnect.js');
const routes = require('./routes.js');


app.use(express.json());
app.use(routes); // Use the routes defined in routes.js


(async () => {
  try {
    await DB.sync({ force: false }); // Sincroniza todos os modelos na ordem correta
    console.log('Database synchronized successfully.');
    await DB.connect();

    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error during server startup:', error);
    await DB.disconnect(); // Ensure to close the database connection on error
  }
})();

