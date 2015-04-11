var util = require('util'),
    Mongoose = require('mongoose'),
    Schema = Mongoose.Schema;

var db = process.env.NODE_ENV === 'test' ? 'todonode_test' : 'todonode';

var connection_string = util.format('mongodb://%s:%s/%s', 'localhost', '27017', db);
Mongoose.connect(connection_string);


var ToDoSchema = new Schema({
  title:      { type: String,  default: '', required: true, trim: true },
  completed:  { type: Boolean, default: false },
  created:    { type: Date,    default: Date.now }
});

var ToDo = Mongoose.model('todo', ToDoSchema);

module.exports = ToDo;