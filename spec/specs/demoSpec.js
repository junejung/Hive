var requirejs = require("requirejs");
// Path to serverside config
requirejs.config(require("../../server/config"));

requirejs(['buster', 'roomModel'], function(buster, Room) {
  // Set up BDD-style expectations
  var expect = buster.assertions.expect;
  buster.spec.expose();

  describe('Rooms', function() {
    before(function() {
    });

    describe(': they', function() {
      itEventually('should test something', function() {
        expect(true).toEqual(true);
      });
    });

  });
});
