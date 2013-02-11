define(function(require) {
  var $        = require('jquery'),
      Backbone = require('backbone'),
      Kinetic  = require('kinetic');


  var StageView = Backbone.View.extend({

    initialize: function(){
      this.collection.bind("change", this.render, this);
      this.stage = new Kinetic.Stage({
        container: 'container',
        width: 1400,
        height: 600,
        draggable: true
      });
      this.layer =  new Kinetic.Layer();
      this.stage.add(this.layer);
    },

    render: function(){
      // TODO: clear out the layer before
      var self = this;
      _.each(self.collection, function(piece){
        var hexView = new PieceView({
          model: piece,
          hex : new Kinetic.RegularPolygon(piece.hexStyle)
        });
        self.layer.add(hexView.hex);
      });
      this.stage.draw();
    }

  });

  return StageView;
});
