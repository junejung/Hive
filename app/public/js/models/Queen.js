define(function(require) {
  var Piece = require('Piece');

  var QueenBee = function() {
    Piece.apply(this, arguments);
  };

  // Inherit from Piece's prototype
  QueenBee.prototype = Object.create(Piece.prototype);

  QueenBee.prototype.type = 'Queen';

  QueenBee.prototype.canMove = function(direction) {
    // A queen bee can move out of it's current location

    // A queen bee can't move onto another piece
    if(this.neighbors[direction]) return false;

    // Get the left and right directions
    var left = direction === 0 ? 5 : direction - 1;
    var right = direction === 5 ? 0 : direction + 1;

    // If the left and right are both occupied, we can't move
    if(this.neighbors[left] && this.neighbors[right]) return false;
    // If left and right are both unoccupied, we can't move
    if(!this.neighbors[left] && !this.neighbors[right]) return false; 

    // Otherwise, we're clear
    return true;
  };

  QueenBee.prototype.possibleMoves = function() {
    // called after QueenBee is selected
    var validDirections = [];
    // loop over QueenBee.neighbors array, call QueenBee.canMove() @ each iteration
    for (var i = 0; i < this.neighbors.length-2; i++) {
      if(this.canMove(i)){
        validDirections.push(i);
      }
    }
    // using validDirections check if the resulting move has at least one neighbor
    // return available neighbors and sides
  };

  QueenBee.prototype.isSurrounded = function() {
    var self = this;
    var currentNeighbors = _.filter(self.neighbors, function(neighbor) {
      if (neighbor && (self.neighbors.indexOf(neighbor) !== 6 || self.neighbors.indexOf(neighbor) !== 7)){
        return neighbor;
      }
    });
    if (currentNeighbors.length === 6) {
      console.log('GAME OVER!');
    }
  };

  return QueenBee;
});
