define(function(require) {
  var $        = require('jquery'),
      Backbone = require('backbone'),
      Kinetic  = require('kinetic');

  var PieceView = Backbone.View.extend({

    initialize: function(){
      this.team = this.model.attributes.model.team;
      this.hexStyle = {
        x: arguments[0].position ? arguments[0].position.x : 200,
        y: arguments[0].position ? arguments[0].position.y : 200,
        sides: 6,
        radius: 50,
        draggable: true,
        stroke: this.team,
        strokeWidth: 2,
        name: 'bug'
      };

      this.hex = new Kinetic.RegularPolygon(this.hexStyle);
      this.src = "img/game_tiles/png/"+this.model.attributes.model.team+"_"+this.model.attributes.model.type+".png";
    }
  });

  return PieceView;
});
