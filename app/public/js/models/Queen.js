define(function(require) {
  var Piece = require('Piece');

  var Queen = function() {
    Piece.apply(this, arguments);
  };

  // Inherit from Piece
  Queen.prototype = Object.create(Piece.prototype);

  Queen.prototype.type = 'Queen';

  Queen.prototype.canMove = function(direction) {
    // TODO: Inherit from piece and extend.
    // A queen can't move onto another piece
    //if (this.neighbors[direction]) return false;

    // Otherwise, we're clear
    return true;
  };

  Queen.prototype.possibleMoves = function() {
    // called after Queen is selected
    var validDirections = [];
    // loop over Queen.neighbors array, call Queen.canMove() @ each iteration
    for (var i = 0; i < this.neighbors.length-2; i++) {
      if(this.canMove(i)){
        validDirections.push(i);
      }
    }
    // using validDirections check if the resulting move has at least one neighbor
    // return available neighbors and sides
  };

  Queen.prototype.isSurrounded = function() {
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

  return Queen;
});
