define(function(require) {
  var Bug = require('Bug');

  var Spider = function(type, no){
    Bug.call(this);
    this.id = [type, no];
    this.movementCalculator = function(){};
  };
  Spider.prototype = Object.create(Bug.prototype);

  return Spider;
});
