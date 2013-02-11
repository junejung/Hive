define(function(require) {
  var Backbone    = require('backbone'),
      Hive        = require('Hive'),
      Piece       = require('Piece'),
      GhostPiece  = require('GhostPiece'),
      Queen       = require('Queen'),
      Ant         = require('Ant'),
      Spider      = require('Spider'),
      Grasshopper = require('Grasshopper'),
      Beetle      = require('Beetle'),
      HandView    = require('./HandView'),
      PieceView   = require('./PieceView'),
      StageView   = require('./StageView'),
      StageCollection = require('../collections/StageCollection');

  // var StageView = Backbone.View.extend({
  //   initailize: function(){
  //     // this.collection.on("all", this.render, this);
  //   },

  //   render: function(){
  //     var self = this;
  //     _.each(self.collection, function(piece){
  //       var hexView = new PieceView({
  //         model: piece
  //       });
  //       hexView.render();
  //     });
  //   // add the layer to the stage
  //   stage.add(layer1);
  //   }
  // });
  var makeTileStack = function(){
    return {
      Queen : 1,
      Spider : 2,
      Beetle : 2,
      Ant : 3,
      Grasshopper: 3
    };
  };

  // when game starts
  // create one empty board collection
  var newStageCollection = new StageCollection();
  var newStageView = new StageView({collection: newStageCollection});
  var newHandViewWhite = new HandView({collection: newStageCollection, color: 'white', tileStack: makeTileStack()});
  var newHandViewBlack = new HandView({collection: newStageCollection, color: 'black', tileStack: makeTileStack()});

  // create two hand collections
    // each team has 11pieces of bugs
      // 1 queen bee, 2 spiders, 2 beetles, 3 ants, 3 g rasshoppers
      // each piece should have id
      // maybe setting pics in here by team(b & W)
});
