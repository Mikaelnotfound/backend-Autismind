const App = require('./App.js');

(async () => {
  try {
    const app = new App();
    await app.start();
  } catch (error) {
    console.error('Erro ao iniciar o servidor:', error);
    process.exit(1);
  }
})();