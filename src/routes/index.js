const userRoutes = require('./users');
const messageRoutes = require('./message');
const chatRoutes = require('./chats');
const historicalRoutes = require('./historical');
const characterRoutes = require('./character');
const statusRoute = require('./status');

module.exports = {
  statusRoute,
  userRoutes,
  messageRoutes,
  chatRoutes,
  historicalRoutes,
  characterRoutes
};