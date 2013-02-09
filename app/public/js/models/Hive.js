define(function(require) {
  var $        = require('jquery'),
      Backbone = require('backbone');

  var Hive = {};

  //Constants
  var N      = 0;
  var NE     = 1;
  var SE     = 2;
  var S      = 3;
  var SW     = 4;
  var NW     = 5;
  var ABOVE  = 6;
  var BELOW  = 7;

  Hive.prototype = new Backbone.Model();

  Hive.prototype.sides = {
    N    : N,
    NE   : NE,
    SE   : SE,
    S    : S,
    SW   : SW,
    NW   : NW,
    ABOVE: ABOVE,
    BELOW: BELOW
  };

  Hive.prototype.sideNames = [
    'N',
    'NE',
    'SE',
    'S',
    'SW',
    'NW',
    'ABOVE',
    'BELOW'
  ];

  return Hive;
});
