define(function(require) {
  var Bug = require('Bug');

  var Beetle = function(type, no){
    Bug.call(this);
    this.id = [type, no];
    this.movementCalculator = function(){};
  };
  Beetle.prototype = Object.create(Bug.prototype);

  return Beetle;
});
