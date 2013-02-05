define(function(require) {
  var Bug = require('Bug');

  var Soldier = function(){
    Bug.call(this);
    this.movementCalculator = function(){};
  };
  Soldier.prototype = Object.create(Bug.prototype);

  return Soldier;
});
