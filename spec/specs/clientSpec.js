var requirejs = require("requirejs");
// Path to serverside config
requirejs.config(require("../../app/public/js/tests-config"));

requirejs(['buster'], function(buster) {
  // Set up BDD-style expectations
  var expect = buster.assertions.expect;
  buster.spec.expose();

  // describe('Queen Class', function() {
  //   var whiteQueen;
  //   before(function() {
  //     whiteQueen = new Queen("light");
  //   });

  //   it('should have all the properties of a Bug', function() {
  //     expect(typeof whiteQueen.currentPosition).toEqual("object");
  //     expect(typeof whiteQueen.getCurrentPosition).toEqual("function");
  //   });

  //   describe('movementCalculator',function(){
  //     itEventually('Queen Bee should move only 1 space at a time', function() {
  //       expect().toBe();
  //     });
  //   });

  // });
});
