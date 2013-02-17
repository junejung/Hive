define(function(require) {
  var Piece = require('Piece');

  var Queen = function() {
    Piece.call(this, arguments);
  };

  // Inherit from Piece
  Queen.prototype = Object.create(Piece.prototype);
  Queen.prototype.constructor = Piece;

  Queen.prototype.type = 'Queen';

  Queen.prototype.canMove = function() {
    // Run all of Piece's tests...
    var allowed = Piece.prototype.canMove.apply(this, arguments);

    // ...and add a few of our own!
    return result = allowed || function() {
      var validNeighbors = this.validNeighbors();

      // If an edge piece has five or six neighbors, it cannot move
      if (validNeighbors >= 5) {
        return false;
      }

    }();
  };

  // TODO: Verify this works.
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
    // Get a list of all horizontal neighbors. This excludes neighbors above and
    // below the queen.
    var currentNeighbors = _.filter(this.neighbors, function(neighbor) {
      if (neighbor && (this.neighbors.indexOf(neighbor) !== 6 || this.neighbors.indexOf(neighbor) !== 7)){
        return neighbor;
      }
    });

    if (currentNeighbors.length === 6) {
      console.log('GAME OVER!');
    }
  };

  return Queen;
});
