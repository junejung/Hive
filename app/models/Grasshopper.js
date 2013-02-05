define(function(require) {
  var Bug = require('Bug');

  var Grasshopper = function(){
    Bug.call(this);
    this.movementCalculator = function(){};
  };
  Grasshopper.prototype = Object.create(Bug.prototype);

  return Grasshopper;
});
