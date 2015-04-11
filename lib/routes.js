var h = require('./handlers');

module.exports.attach = function(server){

  server.route({
    method: 'GET',
    path: '/todos',
    handler: h.get
  });

  server.route({
    method: 'GET',
    path: '/todos/{id}',
    handler: h.get_by_id
  });

  server.route({
    method: 'POST',
    path: '/todos',
    handler: h.create
  });

  server.route({
    method: 'PUT',
    path: '/todos/{id}',
    handler: h.update
  });

  server.route({
    method: 'DELETE',
    path: '/todos/{id}',
    handler: h.delete
  });

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: 'backbone_marionette'
      }
    }
  });
};
