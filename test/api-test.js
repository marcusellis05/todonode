
var Lab = require('lab'),
    lab = Lab.script(),
    describe = lab.describe,
    it = lab.it,
    expect = require('code').expect;

var server = require('../app.js');

var async = require('async'),
    model = require('../lib/model'),
    fixture = require('./fixture.json');


lab.before(function(done){
  var f = 0;

  function saveTodo(data, cb){
    new model(data).save(function(err, doc){
      fixture[f]._id = doc._id.toString();
      f++;
      cb();
    });
  };

  model.remove({}, function(err){
    async.eachSeries(fixture, saveTodo, done);
  });
});


describe('Todos', function(){

  describe('GET "/todos"', function(){
    it('returns a list of todos', function(done){
      var req = {
        method: 'GET',
        url: '/todos'
      };

      server.inject(req, function(res){
        var body = res.result;
        
        expect(res.statusCode).to.equal(200);
        expect(body).to.be.a.array();
        expect(body).to.have.length(fixture.length);

        done();
      });
    });
  });

  describe('GET "/todos/{id}"', function(){
    it('returns a single todo model', function(done){
      var todo = fixture[0],
          req = {
            method: 'GET',
            url: '/todos/' + todo._id
          };

      server.inject(req, function(res){
        var body = res.result;
        
        expect(res.statusCode).to.equal(200);
        expect(body).to.be.a.object();

        expect(body._id.toString()).to.equal(todo._id);

        expect(body.title).to.be.a.string();
        expect(body.title).to.equal(todo.title);

        expect(body.completed).to.be.a.boolean();
        expect(body.completed).to.equal(todo.completed);

        expect(body.created).to.be.a.date();

        done();
      });
    });
    it('returns a 404 error when given a bad id', function(done){
      var req = {
            method: 'GET',
            url: '/todos/555555555555555555555555'
          };

      server.inject(req, function(res){
        expect(res.statusCode).to.equal(404);
        done();
      });
    });
  });

  describe('POST "/todos"', function(){
    it('creates a single todo model', function(done){
      var todo = {
            title: 'New Test'
          },
          req = {
            method: 'POST',
            url: '/todos',
            payload: todo
          };

      server.inject(req, function(res){
        var body = res.result;
        
        expect(res.statusCode).to.equal(200);
        expect(body).to.be.a.object();

        expect(body._id).to.exist();
        expect(body._id).to.be.a.object();

        expect(body.title).to.be.a.string();
        expect(body.title).to.equal(todo.title);

        expect(body.completed).to.be.a.boolean();
        expect(body.completed).to.equal(false);

        done();
      });
    });
  });

  describe('PUT "/todos/{id}"', function(){
    it('updates a single todo model', function(done){
      var todo = fixture[1],
          req = {
            method: 'PUT',
            url: '/todos/' + todo._id,
            payload: {
              title: 'New Test Todo',
              completed: true
            }
          };

      server.inject(req, function(res){
        var body = res.result;
        
        expect(res.statusCode).to.equal(200);
        expect(body).to.be.a.object();

        expect(body.title).to.be.a.string();
        expect(body.title).to.equal('New Test Todo');

        expect(body.completed).to.be.a.boolean();
        expect(body.completed).to.equal(true);

        done();
      });
    });
    it('returns a 404 error when given a bad id', function(done){
      var req = {
            method: 'PUT',
            url: '/todos/555555555555555555555555'
          };

      server.inject(req, function(res){
        expect(res.statusCode).to.equal(404);
        done();
      });
    });
  });

  describe('DELETE "/todos/{id}"', function(){
    it('deletes a single todo model', function(done){
      var todo = fixture[1],
          req = {
            method: 'DELETE',
            url: '/todos/' + todo._id
          };

      server.inject(req, function(res){
        var body = res.result;
        
        expect(res.statusCode).to.equal(200);
        expect(body).to.be.a.object();

        expect(body._id).to.exist();
        expect(body._id).to.be.a.object();

        done();
      });
    });
    it('returns a 404 error when given a bad id', function(done){
      var req = {
            method: 'DELETE',
            url: '/todos/555555555555555555555555'
          };

      server.inject(req, function(res){
        expect(res.statusCode).to.equal(404);
        done();
      });
    });
  });

});


module.exports.lab = lab;