var requirejs = require("requirejs");
// Path to serverside config
requirejs.config(require("../../app/public/js/tests-config"));

requirejs(['buster', 'Bug', 'Beetle', 'Queen', 'Soldier', 'Spider', 'Grasshopper'], function(buster, Bug, Beetle, Queen, Soldier, Spider, Grasshopper) {
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
      whiteQueen = new Queen("light");
    });

    it('should have all the properties of a Bug', function() {
      expect(typeof whiteQueen.currentPosition).toEqual("object");
      expect(typeof whiteQueen.getCurrentPosition).toEqual("function");
    });

    describe('movementCalculator',function(){
      itEventually('Queen Bee should move only 1 space at a time', function() {
        expect().toBe();
      });
    });

  });


  describe('Spider Class', function() {
    var whiteSpider1;
    before(function() {
      whiteSpider1 = new Spider("light", 1);
    });

    it('should have all the properties of a Bug', function() {
      expect(typeof whiteSpider1.currentPosition).toEqual("object");
      expect(typeof whiteSpider1.getCurrentPosition).toEqual("function");
    });

    describe('movementCalculator',function(){
      itEventually('Spider should be able to move exactly three spaces around the edge of the hive', function() {
        expect().toBe();
      });
    });

  });


  describe('Beetle Class', function() {
    var whiteBeetle1;
    before(function() {
      whiteBeetle1 = new Beetle("light", 1);
    });

    it('should have all the properties of a Bug', function() {
      expect(typeof whiteBeetle1.currentPosition).toEqual("object");
      expect(typeof whiteBeetle1.getCurrentPosition).toEqual("function");
    });

    describe('movementCalculator',function(){
      itEventually('Beetle should move only 1 space at a time', function() {
        expect().toBe();
      });

      itEventually('Beetle should be able to move on top of other pieces', function() {
        expect().toBe();
      });
    });

  });


  describe('Grasshopper Class', function() {
    var whiteGrasshopper1;
    before(function() {
      whiteGrasshopper1 = new Grasshopper("light", 1);
    });

    it('should have all the properties of a Bug', function() {
      expect(typeof whiteGrasshopper1.currentPosition).toEqual("object");
      expect(typeof whiteGrasshopper1.getCurrentPosition).toEqual("function");
    });

    describe('movementCalculator',function(){
      itEventually('a Grasshopper should be able to jump over one or more other pieces in a straight line and land in an empty space', function() {
        expect().toBe();
      });
    });

  });


  describe('Soldier Class', function() {
    var whiteSoldier1;
    before(function() {
      whiteSoldier1 = new Soldier("light", 1);
    });

    it('should have all the properties of a Bug', function() {
      expect(typeof whiteSoldier1.currentPosition).toEqual("object");
      expect(typeof whiteSoldier1.getCurrentPosition).toEqual("function");
    });

    describe('movementCalculator',function(){
      itEventually('a Soldier Ant should be able to move any number of spaces around the edge of the hive', function() {
        expect().toBe();
      });
    });

  });

});
