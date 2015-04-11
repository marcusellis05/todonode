var nconf = require('nconf');

nconf.defaults({
  port: 3000,
  db: {
    url: 'mongodb://localhost:27017',
    name: 'todonode'
  }
})

nconf.argv().env();
