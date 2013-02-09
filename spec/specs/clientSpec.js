var requirejs = require('requirejs');
// Path to serverside config
requirejs.config(require('../../app/public/js/tests-config'));

requirejs(['buster', 'Hive', 'Piece'], function(buster, Hive, Piece) {
  // Set up BDD-style expectations
  var expect = buster.assertions.expect;
  buster.spec.expose();

  describe('Hive Prototype', function() {

    it('should be an Object', function() {
      expect(typeof Hive).toEqual("object");
    });

    it('should be an instance of Backbone Model', function() {
      expect(Hive.prototype instanceof Backbone.Model).toEqual(true);
    });
  });

  describe('Hive Piece', function() {
    var testPiece;

    before(function(){
      testPiece = new Piece({name: 'testPiece'});
    });

    it('should create one piece', function() {
      expect().toEqual(1);
    });

    // it('should be an instance of Backbone Model', function() {
    //   expect(Hive.prototype instanceof Backbone.Model).toEqual(true);
    // });
  });


});
