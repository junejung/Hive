define(function(require) {
  var Piece = require('Piece');

  var Grasshopper = function() {
    // Call parent constructor
    Piece.apply(this, arguments);
  };

  // Inherit from Piece
  Grasshopper.prototype = Object.create(Piece.prototype);

  Grasshopper.prototype.type = 'Grasshopper';

  Grasshopper.prototype.canMove = function() {
    var self = this;
    var numberOfneighbors = _.compact(self.neighbors.slice(0,6));

    if (self.neighbors[ABOVE]){
      return false;
    } else if (numberOfneighbors.length > 4) {
      return true;
    } else if (numberOfneighbor) {

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
