const hapi = require('hapi');
const inert = require('inert');
const routes = require('./routes');


const server = new hapi.Server();


server.connection({
  host: 'localhost',
  port: 3000
});


server.register(inert, err => {
  if (err) {
    throw err;
  }
  server.route(routes);
});

module.exports = server;
