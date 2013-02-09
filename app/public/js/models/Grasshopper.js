define(function(require) {
  var Piece = require('Piece');

  var Grasshopper = function() {
    // Call parent constructor
    Piece.apply(this, arguments);
  };

  // Inherit from Piece
  Grasshopper.prototype = Object.create(Piece.prototype);

  Grasshopper.prototype.type = 'Grasshopper';

  Grasshopper.prototype.canMove = function(direction) {
    if (this.neighbors[direction]) {
      return true;
    } else {
      return false;
    }
  };

  // TODO: figure out what to return to show valid moves to player
  Grasshopper.prototype.possibleMoves = function() {
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

  return Grasshopper;
});
