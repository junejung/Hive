define(['Piece'], function(Piece) {

  Piece.Beetle = function() {
    // Call parent constructor
    Piece.apply(this, arguments);
  };

  // Inherit from Piece
  Piece.Beetle.prototype = Object.create(Piece.prototype);

  Piece.Beetle.prototype.type = 'Beetle';

  Piece.Beetle.prototype.canMove = function(direction) {
    // Beetle can move anywhere, except if it would leave another piece detached
    var left = direction === 0 ? 5 : direction - 1;
    var right = direction === 5 ? 0 : direction + 1;
    // If left and right are both unoccupied, we can't move
    if(!this.neighbors[left] && !this.neighbors[right]) { return false; }

    // Otherwise, we're clear
    return true;

  };

  // TODO: figure out what to return to show valid moves to player
  Piece.Beetle.prototype.possibleMoves = function() {
    // called after Beetle is selected
    var validDirections = [];
    // loop over Beetle.neighbors array, call Beetle.canMove() @ each iteration
    for (var i = 0; i < this.neighbors.length-2; i++) {
      if(this.canMove(i)){
        validDirections.push(i);
      }
    }

    return validDirections;

  };

  return Piece.Beetle;

});
