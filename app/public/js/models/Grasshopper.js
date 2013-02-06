define(function(require) {
  var Bug = require('Bug');

  var Grasshopper = function(type, no){
    Bug.call(this);
    this.id = [type, no];
    this.movementCalculator = function(){};
  };
  Grasshopper.prototype = Object.create(Bug.prototype);

  return Grasshopper;
});
