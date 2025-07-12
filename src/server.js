require('dotenv').config();

const app = require('./src/App');

const pool = require('./src/database/Pool/Pool.js'); 
const migrate = require('./src/database/migrate.js'); 
const seedCharacters = require('./src/database/seed.js'); 

if (process.env.NODE_ENV !== 'production') {
  async function startLocalServer() {
    try {
    
      pool.connect();

      await migrate();
      await seedCharacters();

      console.log('Database is ready and connection pool is active.');

      const PORT = process.env.PORT || 3000;
      app.listen(PORT, () => {
        console.log(`Local server running on port http://localhost:${PORT}/api`);
        console.log(`API documentation available at http://localhost:${PORT}/api/api-docs/`);
      });
    } catch (error) {
      console.error('Error during local server startup:', error);
   
      await pool.disconnect();
      process.exit(1);
    }
  }
  startLocalServer();
}

module.exports = app;
