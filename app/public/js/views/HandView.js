define(function(require) {
  var $        = require('jquery'),
      Backbone = require('backbone');

  var HandView = Backbone.View.extend({

    initialize: function(){

    },

    events:{
      'click' : function(e) {
        // not sure if 'this' is pointing to right reference
        this.placePiece(e.target.id);
      }
    },

    tileStack: {
      Queen : 1,
      Spider : 2,
      Beetle : 2,
      Ant : 3,
      Grasshopper: 3
    },

    placePiece: function(type){
      this.tileStack[type] = this.tileStack[type] - 1;
      this.collection.add({
        model: new Queen(),
        //gameId: length of collection
      });
      if (this.tileStack[type] === 0){
        //make it unclickable
      }
    }
  });

  return HandView;
});
