define(['Piece'], function(Piece) {

  Piece.Ant = function() {
    // Call parent constructor
    Piece.apply(this, arguments);
  };

  // Inherit from Piece
  Piece.Ant.prototype = Object.create(Piece.prototype);

  Piece.Ant.prototype.type = 'Ant';

  Piece.Ant.prototype.canMove = function(direction) {
    // An ant can't move onto another piece
    if(this.neighbors[direction]) return false;

    // Get the left and right directions
    var left = direction === 0 ? 5 : direction - 1;
    var right = direction === 5 ? 0 : direction + 1;

    // If the left and right are both occupied, we can't move
    if(this.neighbors[left] && this.neighbors.right) return false;

    // Otherwise, we're clear
    return true;

  };

  return Piece.Ant;

});
