define(function(require) {
  var Piece = require('Piece');

  var Spider = function() {
    Piece.apply(this, arguments);
  };

  // Inherit from Piece
  Spider.prototype = Object.create(Piece.prototype);
  Spider.prototype.constructor = Piece;

  Spider.prototype.type = 'Spider';

  Spider.prototype.canMove = function() {
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

  // TODO: Implement this
  Spider.prototype.possibleMoves = function() {
  };

  return Spider;
});
