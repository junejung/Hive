define(function(require) {
  var Bug = require('Bug');

  var Queen = function(type){
    Bug.call(this);
    this.id = [type];
    this.movementCalculator = function(){};
  };
  Queen.prototype = Object.create(Bug.prototype);

  return Queen;
});
