const userRoutes = require('./users');
const messageRoutes = require('./message');
const chatRoutes = require('./chats');
const characterRoutes = require('./character');
const statusRoute = require('./status');

module.exports = {
  statusRoute,
  userRoutes,
  messageRoutes,
  chatRoutes,
  characterRoutes
};