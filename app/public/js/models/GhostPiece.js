define(function(require) {
  var Piece = require('Piece');

  var GhostPiece = function() {

    Piece.apply(this, arguments);
  };

  GhostPiece.prototype = Object.create(Piece.prototype);

  GhostPiece.prototype.type = null;
  // takes place of null

  return GhostPiece;
});
