define(function(require) {
  var $             = require('jquery'),
      Backbone      = require('backbone'),
      Queen         = require('Queen'),
      Beetle        = require('Beetle'),
      Ant           = require('Ant'),
      Spider        = require('Spider'),
      Grasshopper   = require('Grasshopper'),
      _             = require('underscore');

  var HandView = Backbone.View.extend({

    tagName: 'div',
// spans need White/Black id to differ themselves
    template: _.template("<span id='Queen'>Queen :<%=Queen%></span>\
      <span id='Spider'>Spider :<%=Spider%></span>\
      <span id='Beetle'>Beetle :<%=Beetle%></span>\
      <span id='Ant'>Ant :<%=Ant%></span>\
      <span id='Grasshopper'>Grasshopper :<%=Grasshopper%></span>"),

    initialize: function(){
      this.color = arguments[0].color;
      this.tileStack = arguments[0].tileStack;
      this.render();
    },

    events:{
      'click' : function(e) {
        // not sure if 'this' is pointing to right reference
        console.log(e.target);
        this.placePiece(e.target.id);
      }
    },

    render: function(){
      if(this.color === "white"){
        $('div#white-player').append(this.$el.html(this.template(this.tileStack)));
      }else if(this.color === "black"){
        $('div#black-player').append(this.$el.html(this.template(this.tileStack)));
      }
      // return this.$el;
    },

    placePiece: function(type){
      this.tileStack[type] = this.tileStack[type] - 1;
      // this.collection.add({
      //   model: new type(),
      //   //gameId: length of collection
      // });
      // if (this.tileStack[type] === 0){
      //   //make it unclickable
      // }
      this.render();
    }
  });

  return HandView;
});
