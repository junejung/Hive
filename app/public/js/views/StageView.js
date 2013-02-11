define(function(require) {
  var $         = require('jquery'),
      Backbone  = require('backbone'),
      PieceView = require('./PieceView'),
      Kinetic   = require('kinetic');


  var StageView = Backbone.View.extend({

    initialize: function(){
      this.collection.bind("all", this.render, this);
      this.stage = new Kinetic.Stage({
        container: 'container',
        width: 1000,
        height: 600,
        draggable: true
      });
      this.layer =  new Kinetic.Layer();
      this.stage.add(this.layer);
    },

    render: function(){
      // TODO: clear out the layer before
      var self = this;
      this.collection.each(function(piece){
        var hexView = new PieceView({
          model: piece
        });
        self.layer.add(hexView.hex);
      });
      this.stage.draw();
    }

  });

  return StageView;
});
