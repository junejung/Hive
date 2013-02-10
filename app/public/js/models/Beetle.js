define(function(require) {
  var Piece = require('Piece');

  var Beetle = function() {
    // Call parent constructor
    Piece.apply(this, arguments);
  };

  // Inherit from Piece
  Beetle.prototype = Object.create(Piece.prototype);

  Beetle.prototype.type = 'Beetle';

  Beetle.prototype.canMove = function() {
    // delegate up to Hive.Piece.prototype.canMove and extend its functionality
    // with further rules.

    // Beetle can move anywhere, except if it would leave another piece detached
    var left = direction === 0 ? 5 : direction - 1;
    var right = direction === 5 ? 0 : direction + 1;
    // If left and right are both unoccupied, we can't move
    if(!this.neighbors[left] && !this.neighbors[right]) { return false; }

    // Otherwise, we're clear
    return true;
  };

  // TODO: figure out what to return to show valid moves to player
  Beetle.prototype.possibleMoves = function() {
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

  return Beetle;
});
