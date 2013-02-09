define(function(require) {
  var Piece = require('Piece');

  var GhostPiece = function() {

    Piece.apply(this, arguments);
  };

  Piece.GhostPiece.prototype = Object.create(Piece.prototype);

  Piece.GhostPiece.prototype.type = null;
  // takes place of null

  return Piece.GhostPiece;
});
