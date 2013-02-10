var HexTile = Backbone.Model.extend({
  defaults: {
    x:300,
    y:300,
    sides:6,
    radius:50,
    draggable: true,
    fill: 'green',
    stroke: 'black',
    strokeWidth: 4
  }
});