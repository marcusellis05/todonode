var model = require('./model');

module.exports.get = function(req, reply){
  model.find({}, function(err, todos){
    if (err){
      console.log(err);
      return reply(err, null);
    }
    reply(null, todos);
  });
};

module.exports.get_by_id = function(req, reply){
  model.findById(req.params.id, function(err, todo){
    if (err){
      console.log(err);
      return reply(err, null);
    }
    if (!todo){
      return reply(null).code(404);
    }
    reply(null, todo);
  });
};

module.exports.create = function(req, reply){
  var todo = new model(req.payload);

  todo.save(function(err, todo){
    if (err){
      console.log(err);
      return reply(err, null);
    }
    reply(null, todo);
  });
};

module.exports.update = function(req, reply){
  model.findByIdAndUpdate(req.params.id, req.payload, function(err, todo){
    if (err){
      console.log(err);
      return reply(err, null);
    }
    if (!todo){
      return reply(null).code(404);
    }
    reply(null, req.payload);
  });
};

module.exports.delete = function(req, reply){
  model.findByIdAndRemove(req.params.id, function(err, todo){
    if (err){
      console.log(err);
      return reply(err, null);
    }
    if (!todo){
      return reply(null).code(404);
    }
    reply(null, todo);
  });
};
