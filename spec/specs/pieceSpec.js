var requirejs = require('requirejs');
// Path to serverside config
requirejs.config(require('../../app/public/js/tests-config'));

requirejs(['buster', 'Hive', 'Piece', 'underscore'], function(buster, Hive, Piece, _) {
  // Set up BDD-style expectations
  var expect = buster.assertions.expect;
  buster.spec.expose();


  describe('Piece', function() {
    // Before each test, (re)create a piece with dummy properties and reset its neighbors.
    var piece, fullPiece, stubNeighbors;
    beforeEach(function(){
      // Stub out some dummy neighbors
      stubNeighbors = [];
      for (var i = 0; i < 7; i++) {
        stubNeighbors[i] = new Piece({id: i, team: 'black'});
      }

      // Create some dummy pieces
      piece = new Piece({id: 100, team: 'white'});
      fullPiece = new Piece({id: 101, team: 'white'});

      // Give the full piece some dummy neighbors. Don't use connectToNeighbors
      // so that we can fill it up without resetting neighbors.
      for (var n = 0; n < stubNeighbors.length; n++) {
        fullPiece.neighbors[n] = stubNeighbors[n];
      }
    });

    describe('resetNeighbors', function() {
      it("should reset a piece's neighbors to null", function() {
        // First, check to be sure the piece has all neighbor slots full
        expect(fullPiece.validNeighbors()).toEqual(7);

        // Reset all the neighbors and test if they're all null
        fullPiece.resetNeighbors();
        _.each(fullPiece.neighbors, function(neighbor){
          expect(neighbor).toBe(null);
        });
      });
    });

    describe('connectToNeighbor', function() {
      it('should connect an arbitrary neighbor to a piece', function() {
        // Connect a dummy neighbor at the 0/N position
        piece.connectToNeighbor(stubNeighbors[0], 0);

        // Make sure it's been connected and that it's the only piece that was connected
        expect(piece.validNeighbors()).toEqual(1);
        expect(piece.neighbors[0]).toBe(stubNeighbors[0]);
      });
    });

    describe('commonNeighborCount', function() {
      it('should return a count of how many neighbors the piece and its neighbor have in common', function() {
        piece.connectToNeighbor(stubNeighbors[0], 0);
        expect(piece.commonNeighborCount(0)).toEqual(0);

        piece.neighbors[1] = stubNeighbors[1];
        piece.neighbors[2] = stubNeighbors[2];

        expect(piece.commonNeighborCount(0)).toEqual(1);
        expect(piece.commonNeighborCount(1)).toEqual(2);
        expect(piece.commonNeighborCount(2)).toEqual(1);
      });
    });

    describe('commonNeighborCount', function() {
      itEventually('should return a count of how many neighbors the piece and its neighbor have in common', function() {
      });
    });

    describe('canMove', function() {
      it('should throw an error if a piece has no neighbors', function() {
        // Can't get expect-style .toThrow to work here, falling back on assertion
        assert.exception(piece.canMove);
      });

      itEventually('should return false if movement would make the hive discontiguous', function() {
      });

      itEventually("should check if this team's queen is in play and disallow movement if not", function() {
      });

      it('should return true if a neighbor only has one neighbor', function() {
        // Connect a dummy neighbor
        piece.connectToNeighbor(stubNeighbors[0], 0);
        // Check to be sure the neighbor was connected
        expect(piece.neighbors[0]).toBe(stubNeighbors[0]);
        // Check to be sure the piece can move
        expect(piece.canMove()).toBe(true);
      });

    });

  });

});

    //describe('', function() {
      //itEventually('', function() {
      //});
    //});
