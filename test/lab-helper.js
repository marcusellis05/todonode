var Code = require('code');

module.exports = function(lab){
  global.describe = lab.describe;
  global.it = lab.it;

  global.before = lab.before;
  global.after = lab.after;
  global.beforeEach = lab.beforeEach;
  global.afterEach = lab.afterEach;
  
  global.expect = Code.expect;
};
