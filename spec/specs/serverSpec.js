var requirejs = require("requirejs");
// Path to serverside config
requirejs.config(require("../../app/config"));

requirejs(['buster', 'Bug', 'Queen'], function(buster, Bug, Queen) {
  // Set up BDD-style expectations
  var expect = buster.assertions.expect;
  buster.spec.expose();


  describe('Bug Constructor', function() {
    var newBee;
    before(function() {
      var Bee = function(){ Bug.call(this) };
      Bee.prototype = Object.create(Bug.prototype);

      newBee = new Bee();
    });

    it('should have property called currentPosition', function() {
      expect(typeof newBee.currentPosition).toEqual("object");
    });

    it('should have getCurrentPosition function ', function() {
      expect(typeof newBee.getCurrentPosition).toEqual("function");
    });

    describe('getCurrentPosition',function(){
      itEventually('get current position from..?', function() {
        expect().toBe.a(Function);
      });
    });

  });


  describe('Queen Class', function() {
    var whiteQueen;
    before(function() {
      whiteQueen = new Queen();
    });

    it('should have all the properties of a Bee', function() {
      expect(typeof whiteQueen.currentPosition).toEqual("object");
      expect(typeof whiteQueen.getCurrentPosition).toEqual("function");
    });

    describe('Movement Calculator',function(){
      itEventually('should get current postion to next move..', function() {
        expect().toBe();
      });
    });

  });


});
