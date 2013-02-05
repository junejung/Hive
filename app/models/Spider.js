define(function(require) {
  var Bug = require('Bug');

  var Spider = function(){
    Bug.call(this);
    this.movementCalculator = function(){};
  };
  Spider.prototype = Object.create(Bug.prototype);

  return Spider;
});
