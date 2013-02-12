/*jshint multistr:true*/

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
        this.placePiece(e.target.id);
      }
    },

    render: function(){
      // TODO: refactor maybe?
      if(this.color === "white"){
        $('div#white-player').append(this.$el.html(this.template(this.tileStack)));
      }else if(this.color === "black"){
        $('div#black-player').append(this.$el.html(this.template(this.tileStack)));
      }
    },

    bugMap: {
      'Queen'       : Queen,
      'Beetle'      : Beetle,
      'Spider'      : Spider,
      'Ant'         : Ant,
      'Grasshopper' : Grasshopper
    },

    placePiece: function(type){
      if (this.tileStack[type] !== 0){
        this.tileStack[type] = this.tileStack[type] - 1;
        this.collection.add({
          model : new (this.bugMap[type])({})
        });
        this.render();
      }
    }
  });

  return HandView;
});
