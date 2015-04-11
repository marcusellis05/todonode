var util = require('util'),
    nconf = require('nconf'),
    Mongoose = require('mongoose'),
    Schema = Mongoose.Schema;

if (nconf.get('heroku')){
  Mongoose.connect(nconf.get('db:url'));
} else {
  Mongoose.connect(nconf.get('db:url') + '/' + nconf.get('db:name'));
}


var ToDoSchema = new Schema({
  title:      { type: String,  default: '', required: true, trim: true },
  completed:  { type: Boolean, default: false },
  created:    { type: Date,    default: Date.now }
});

var ToDo = Mongoose.model('todo', ToDoSchema);

module.exports = ToDo;