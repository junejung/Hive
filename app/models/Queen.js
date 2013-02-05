define(function(require) {
  var Bug = require('Bug');

  var Queen = function(){
    Bug.call(this);
    this.movementCalculator = function(){};
  };
  Queen.prototype = Object.create(Bug.prototype);

  return Queen;
});
