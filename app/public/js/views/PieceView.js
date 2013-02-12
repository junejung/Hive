define(function(require) {
  var $        = require('jquery'),
      Backbone = require('backbone'),
      Kinetic  = require('kinetic');

  var PieceView = Backbone.View.extend({

    initialize: function(){
      this.hexStyle = {
        x: arguments[0].position ? arguments[0].position.x : 200,
        y: arguments[0].position ? arguments[0].position.y : 200,
        sides: 6,
        radius: 50,
        draggable: true,
        stroke: 'black',
        strokeWidth: 4,
        name: 'bug'
      };
      this.hex = new Kinetic.RegularPolygon(this.hexStyle);
    }
  });

  return PieceView;
});
