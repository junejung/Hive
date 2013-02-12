define(function(require) {
  var Piece = require('Piece');

  var Spider = function() {
    Piece.apply(this, arguments);
  };

  Spider.prototype = Object.create(Piece.prototype);

  Spider.prototype.type = 'Spider';

  return Spider;
});
