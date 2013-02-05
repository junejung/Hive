define(function(require) {
  var Bug = require('Bug');

  var Beetle = function(){
    Bug.call(this);
    this.movementCalculator = function(){};
  };
  Beetle.prototype = Object.create(Bug.prototype);

  return Beetle;
});
