var util = require('util'),
    nconf = require('nconf'),
    Mongoose = require('mongoose'),
    Schema = Mongoose.Schema;

var db_name = nconf.get('db:name');

if (process.env.NODE_ENV === 'test'){
  db_name += '_test';
}

Mongoose.connect(nconf.get('db:url') + '/' + db_name);

var ToDoSchema = new Schema({
  title:      { type: String,  default: '', required: true, trim: true },
  completed:  { type: Boolean, default: false },
  created:    { type: Date,    default: Date.now }
});

var ToDo = Mongoose.model('todo', ToDoSchema);

module.exports = ToDo;