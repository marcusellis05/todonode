var nconf = require('nconf');

nconf.defaults({
  port: 3000,
  db: {
    url: 'mongodb://localhost:27017',
    name: 'todonode'
  }
})

nconf.argv().env();

if (process.env.MONGOLAB_URI){
  nconf.set('db:url', db_url);
}
if (process.env.NODE_ENV === 'test'){
  nconf.set('db:name', 'todonode_test');
}
