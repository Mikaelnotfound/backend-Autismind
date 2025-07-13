require('dotenv').config();
const app = require('./App');

if (process.env.NODE_ENV === 'local') {
  const pool = require('./database/Pool/Pool.js'); 
  const migrate = require('./database/migrate.js'); 
  const seedCharacters = require('./database/seed.js'); 

  const startLocalServer = async () => {
    try {
      pool.connect();
      await migrate();
      await seedCharacters();
      console.log('Database is ready for local development.');

      const PORT = process.env.PORT || 3000;
      app.listen(PORT, () => {
        console.log(`Local server running on http://localhost:${PORT}`);
        console.log(`API documentation available at http://localhost:${PORT}/api/api-docs/`);
      });
    } catch (error) {
      console.error('Error during local server startup:', error);
      await pool.disconnect();
      process.exit(1);
    }
  };

  startLocalServer();
}

module.exports = app;
