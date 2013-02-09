var requirejs = require("requirejs");
// Path to serverside config
requirejs.config(require("../../app/public/js/tests-config"));

requirejs(['buster','Hive', 'backbone'], function(buster, Hive, Backbone) {
  // Set up BDD-style expectations
  var expect = buster.assertions.expect;
  buster.spec.expose();

  describe('Hive Class', function() {

    it('should be an Object', function() {
      expect(typeof Hive).toEqual("object");
    });

  });
});
