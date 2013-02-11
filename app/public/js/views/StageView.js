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
        draggable:true
      });

      this.layer =  new Kinetic.Layer({
        draggable: true
      });

      this.stage.add(this.layer);
    },

    render: function(){
      // TODO: keep bugs in same position
      var locationKeeper = [];
      var bugsOnStage = this.stage.get('.bug');
      _(bugsOnStage).each(function(bug){
        locationKeeper.push({ x: bug.getX(), y: bug.getY()});
      });
      bugsOnStage.apply('remove');

      var self = this;
      this.collection.each(function(piece, i){
        var hexView = new PieceView({
          model: piece,
          position: locationKeeper[i]
        });
        self.layer.add(hexView.hex);
      });
      this.stage.draw();
    }

  });

  return StageView;
});
