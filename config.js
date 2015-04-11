var nconf = require('nconf');

nconf.defaults({
  port: 3000,
  heroku: false,
  db: {
    url: 'mongodb://localhost:27017',
    name: 'todonode'
  }
})

nconf.argv().env();

if (process.env.NODE_ENV === 'test'){
  nconf.set('db:name', nconf.get('db:name') + '_test');
}
