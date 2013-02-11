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
        width:  document.width,
        height: document.height,
        draggable: false
      });


      // // background image non-sense hoop jumping for kinetic
      // this.bgLayer = new Kinetic.Layer({
      //   draggable: false
      // });
      //
      // var backgroundImg,
      //     self = this;
      // var bgImg = new Image();
      // bgImg.width = this.stage.getWidth();
      // bgImg.height = this.stage.getHeight();
      // bgImg.onload = function() {
      //   backgroundImg = new Kinetic.Image({
      //     image: bgImg,
      //     name: 'bgImg',
      //     width: self.stage.getWidth(),
      //     height: self.stage.getHeight(),
      //     draggable: false
      //   });
      //   self.bgLayer.add(backgroundImg);
      //   self.stage.add(self.bgLayer);
      //   self.stage.draw();
      // };
      // bgImg.src = 'img/hiveBorder.png';

      this.layer =  new Kinetic.Layer({
        draggable: true
      });

      this.stage.add(this.layer);
    },

    render: function(){
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
