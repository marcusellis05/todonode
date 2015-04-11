var Hapi = require('hapi'),
    server = new Hapi.Server(),
    routes = require('./lib/routes');

server.connection({
  port: 3000
});

routes.attach(server);


if (!module.parent) {
  server.start(function() {
    console.log('Server running at', server.info.uri);
  });
}

module.exports = server;