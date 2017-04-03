const hapi = require('hapi');
const inert = require('inert');


const server = new hapi.Server();


server.connection({
  host: 'localhost',
  port: 3000
});


server.route({
  method: 'GET',
  path: '/hello',
  handler: (request, reply) => {
    reply('Hello world!');
  }
});


server.route({
  method: 'GET',
  path: '/user/{name}',
  handler: (request, reply) => {
    reply(`Hello ${encodeURIComponent(request.params.name)}!`);
  }
});


// Simplest way to serverstatic file
// server.register(inert, err => {
//   if (err) {
//     throw err;
//   }
//   server.route({
//     method: 'GET',
//     path: '/',
//     handler: (request, reply) => {
//       reply.file('public/index.html');
//     }
//   });
// });


// server.register(inert, err => {
//   if (err) {
//     throw err;
//   }
//   server.route({
//     method: 'GET',
//     path: '/',
//     handler: {
//       file: 'public/index.html'
//     }
//   });
// });


server.register(inert, err => {
  if (err) {
    throw err;
  }
  server.route({
    method: 'GET',
    path: '/{file*}',
    handler: {
      directory: {
        path: 'public/'
      }
    }
  });
});


server.start(err => {
  if (err) {
    throw err;
  }
  console.log(`Server running on ${server.info.uri}`);
});
