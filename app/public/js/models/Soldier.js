define(function(require) {
  var Bug = require('Bug');

  var Soldier = function(type, no){
    Bug.call(this);
    this.id = [type, no];
    this.movementCalculator = function(){};
  };
  Soldier.prototype = Object.create(Bug.prototype);

  return Soldier;
});
