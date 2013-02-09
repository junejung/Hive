define(['Piece'], function(Piece) {

  Piece.Grasshopper = function() {
    // Call parent constructor
    Piece.apply(this, arguments);
  };

  // Inherit from Piece
  Piece.Grasshopper.prototype = Object.create(Piece.prototype);

  Piece.Grasshopper.prototype.type = 'Grasshopper';

  Piece.Grasshopper.prototype.canMove = function(direction) {
    if (this.neighbors[direction]) {
      return true;
    } else {
      return false;
    }
  };

  // TODO: figure out what to return to show valid moves to player
  Piece.Grasshopper.prototype.possibleMoves = function() {
    // called after Grasshopper is selected
    var validDirections = [];
    // loop over Beetle.neighbors array, call Beetle.canMove() @ each iteration
    for (var i = 0; i < this.neighbors.length-2; i++) {
      if(this.canMove(i)){
        validDirections.push(i);
      }
    }

    return validDirections;
  };

  Piece.Grasshopper.prototype.move = function () {
    // need to check if movement would detach from main hive cluster
    // move to the valid location
  };

  return Piece.Grasshopper;

});
