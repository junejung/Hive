define(['Piece'],function(Piece) {

  var Soldier = function(){
    Piece.apply(this, arguments);
  };
  Soldier.prototype = Object.create(Piece.prototype);

  Soldier.prototype.type = 'Soldier';

  Soldier.prototype.canMove = function(direction){
    if(this.neighbors[direction]){ return false; }

    var left = direction === 0 ? 5 : direction - 1;
    var right = direction === 5 ? 0 : direction + 1;

    if(this.neighbors[left] && this.neighbors.right){
      return false;
    }

    return true;

  };

  return Soldier;
  
});
