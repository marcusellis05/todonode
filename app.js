
var nconf = require('nconf'),
    config = require('./config'),
    Hapi = require('hapi'),
    server = new Hapi.Server(),
    routes = require('./lib/routes');

server.connection({
  port: nconf.get('port')
});

routes.attach(server);

if (!module.parent) {
  server.start(function() {
    console.log('Server running at', server.info.uri);
  });
}

module.exports = server;