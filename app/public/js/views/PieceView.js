define(function(require) {
  var $        = require('jquery'),
      Backbone = require('backbone'),
      Kinetic  = require('kinetic');

  var PieceView = Backbone.View.extend({

    initialize: function(){
      this.hexStyle = {
        sides: 6,
        radius: 50,
        draggable: true,
        stroke: 'black',
        strokeWidth: 4
      };
    }
  });

  return PieceView;
});
