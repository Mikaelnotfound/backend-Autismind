const express = require('express');
const dotenv = require('dotenv');
const app = express();
const PORT = process.env.PORT || 3000;


const DB = require('./database/DB/dbConnect.js');

const userRegister = require('./routes/register/userRegister.js');
const userLogin = require('./routes/login/userLogin.js');
const historical = require('./routes/historical/historicalUser.js');


app.use(express.json());
dotenv.config();


app.use('/api/register', userRegister);
app.use('/api/login', userLogin);
app.use('/api/historical', historical);


(async () => {
  try {
    await DB.sync({ force: false });
    console.log('Database synchronized successfully.');
    await DB.connectUser();

    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error during server startup:', error);
    await DB.disconnectUser(); // Ensure to close the database connection on error
  }
})();

