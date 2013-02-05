var requirejs = require("requirejs");
// Path to serverside config
requirejs.config(require("../../app/config"));

requirejs(['buster'], function(buster) {
  // Set up BDD-style expectations
  var expect = buster.assertions.expect;
  buster.spec.expose();

  describe('Nothing', function() {
    before(function() {
    });

    describe('it', function() {
      it('should be nothing', function() {
        expect(false).toBe(false);
      });
    });

  });
});
