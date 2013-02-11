define(function(require) {
  var $        = require('jquery'),
      Backbone = require('backbone'),
      Kinetic  = require('kinetic');

  var PieceView = Backbone.View.extend({

    initialize: function(){
      this.team = this.model.attributes.model.team;
      this.layer = arguments[0].layer;
      this.x = arguments[0].position ? arguments[0].position.x : 200;
      this.y = arguments[0].position ? arguments[0].position.y : 200;
      // TODO: find out how to use kinetic img and polygon together
      // this.hexStyle = {
      //   x: arguments[0].position ? arguments[0].position.x : 200,
      //   y: arguments[0].position ? arguments[0].position.y : 200,
      //   sides: 6,
      //   radius: 50,
      //   draggable: true,
      //   stroke: this.team,
      //   strokeWidth: 2,
      //   name: 'bug'
      // };

      var self = this;

      this.img = new Image();
      this.img.onload = function() {
        var bugbug = new Kinetic.Image({
          x: self.x,
          y: self.y,
          sides: 6,
          radius: 50,
          draggable: true,
          image: self.img,
          stroke: self.team,
          strokeWidth: 2,
          name: 'bug'
        });
        self.layer.add(bugbug);
        self.layer.draw();
      };
      // TODO: find out how to use kinetic img and polygon together
      // this.hex = new Kinetic.RegularPolygon(this.hexStyle);
      this.img.src = "img/game_tiles/png/"+this.model.attributes.model.team+"_"+this.model.attributes.model.type+".png";
    }
  });

  return PieceView;
});
