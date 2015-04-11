var nconf = require('nconf'),
    MONGOLAB_URI = process.env.MONGOLAB_URI;

nconf.defaults({
  port: 3000,
  heroku: false,
  db: {
    url: 'mongodb://localhost:27017',
    name: 'todonode'
  }
})

nconf.argv().env();

if (MONGOLAB_URI){
  nconf.set('heroku', true);
  nconf.set('db:url', MONGOLAB_URI.substr(0, MONGOLAB_URI.indexOf('?')));
}
if (process.env.NODE_ENV === 'test'){
  nconf.set('db:name', 'todonode_test');
}
