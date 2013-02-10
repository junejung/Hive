define(function(require) {
  var Backbone = require('backbone');
  var StageCollection = Backbone.Collection.extend({
    // start with empty colllection
    // when the pieces get added, collection gives then a id
  });
  return StageCollection;
});
