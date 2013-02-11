define(function(require) {
  var $        = require('jquery'),
      Backbone = require('backbone'),
      Kinetic  = require('kinetic');

  var PieceView = Backbone.View.extend({

    initialize: function(){
      this.hexStyle = {
        x: ~~(Math.random() * 1000),
        y: ~~(Math.random() * 600),
        sides: 6,
        radius: 50,
        draggable: true,
        stroke: 'black',
        strokeWidth: 4
      };
      this.hex = new Kinetic.RegularPolygon(this.hexStyle);
    }
  });

  return PieceView;
});
