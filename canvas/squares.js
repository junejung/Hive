var defaultHexStyle = {
  x:300,
  y:300,
  sides:6,
  radius:50,
  draggable: true,
  // fill: 'green',
  stroke: 'black',
  strokeWidth: 4
}

var Hex = Backbone.Model.extend({
  // defaults: {
  //   x:300,
  //   y:300,
  //   sides:6,
  //   radius:50,
  //   draggable: true,
  //   fill: 'green',
  //   stroke: 'black',
  //   strokeWidth: 4
  // }
});

var HexSet = Backbone.Collection.extend({
  model: Hex
});

var HexView = Backbone.View.extend({
  render: function() {
    var model = this.model;
    var newHex = new Kinetic.RegularPolygon(defaultHexStyle);

    layer1.add(newHex);
  }
});

var SetView = Backbone.View.extend({
  initialize: function() {
// todo: might need this. not sure
    // this.collection.on("all", this.render, this);
  },

  render: function() {
    this.collection.each(function(model) {
      var view = new HexView({
        model: model
      });
      view.render();
    })
    // add the layer to the stage
    stage.add(layer1);
  }
});

var stage = new Kinetic.Stage({
  container: 'container',
  width: 1400,
  height: 600,
  draggable: true
});

var layer1 = new Kinetic.Layer();

var c = new HexSet();

var v = new SetView({
  collection: c
});
v.render();
