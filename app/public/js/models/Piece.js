/*jshint expr:true*/

define(function(require) {
  var Hive     = require('Hive'),
      _        = require('underscore');


  Hive.Piece = function(property) {
    // Give the piece a container for neighbors and set all those neighbors to null.
    this.neighbors = [];
    this.resetNeighbors();

    if (property.neighbors) {
      this.neighbors = property.neighbors.slice(0);
    }
    if (property.id) {
      this.id = property.id;
    }
    if (property.team) {
      this.team = property.team;
    }
  };

  var compliment = function(side) {
    // Above another piece
    if (side === 6) {
      return 7;
    }
    // Beneath another piece
    if (side === 7) {
      return 6;
    }
    // Prevent overflows
    if (side >= 3) {
      return side - 3;
    }

    return side + 3;
  };

  Hive.Piece.prototype = new Backbone.Model();

  Hive.Piece.prototype.type = 'Piece';

  // Takes a side number and returns the number of neighbors the piece at that side
  // shares with this.
  Hive.Piece.prototype.commonNeighborCount = function(side) {
    var neighbors = 0;

    // If the piece is above or below, check all sides. This isn't very useful,
    // but we should expect this function to work if we try to call it with an
    // ABOVE (6) or BELOW (7) position.
    if (side > 5) {
      for (var i = 0; i <= 5; i++) {
        if (this.neighbors[i]) { neighbors++; }
      }
    }

    // If the side is position 6, we need to wrap around
    if (side === 5) {
      if (this.neighbors[side - 1]) { neighbors++; }
      if (this.neighbors[0]) { neighbors++; }
    }

    // Check pieces at either side of the piece.
    if (side < 5) {
      if (this.neighbors[side - 1]) { neighbors++; }
      if (this.neighbors[side + 1]) { neighbors++; }
    }

    // Return the number of common neighbors.
    return neighbors;
  };

  // Returns how many non-null neighbors are attached to this piece
  Hive.Piece.prototype.validNeighbors = function() {
    var count = 0;
    _.each(this.neighbors, function(neighbor) {
      if (neighbor) { count++; }
    });
    return count;
  };

  Hive.Piece.prototype.canMove = function() {
    var result;

    var validNeighbors = this.validNeighbors();

    // If the piece has zero neighbors, it can't move. This won't happen in
    // practice. but just in case some weird shit goes down...
    if (validNeighbors === 0) {
      throw new Error("A solitary piece can't move anywhere!");
    }

    // TODO: Remove the piece from piece.pieces for this simulation. Something like:
    // var oldPieces = Piece.pieces;
    // remove the piece
    // replace Piece.pieces after the test is done

    // If moving the piece would cause the hive to be discontiguous, then don't
    // allow movement.
    //if (!Hive.Piece.pieces.areAllContiguous()) {
      //return false;
    //}

    // If the piece only has a single neighbor, it can move
    if (validNeighbors === 1) {
      return true;
    }

    // If a piece has two neighbors, those neighbors must be neighbors of each
    // other for this to be able to move.
    if (validNeighbors === 2) {
      result = false;

      // Loop through all neighbors
      _.each(this.neighbors, function(neighbor, side) {
        // Test if neighbors exist and if that neighbor shares a common neighbor
        // with this.
        if (neighbor && this.commonNeighborCount(side) === 1) {
          result = true;
        }
      });

      return result;
    }

    // If a single neighbor has a compliment, cannot move.
    if (validNeighbors === 3) {
      result = false;

      // Loop through all neighbors
      _.each(this.neighbors, function(neighbor, side) {
        // Test if a neighbor exists and if that neighbor has no compliments.
        if (neighbor && !neighbor[compliment(side)]) {
          result = true;
        }
      });

      return result;
    }

    // If a single neighbor is isolated (shares no common neighbors with this) or if
    // all four neighbors have a compliment, then this cannot move.
    if (validNeighbors === 4) {
      result = false;

      _.each(this.neighbors, function(neighbor, side) {
        // If any given piece shares two neighbors with this, that means that one
        // of this's neighbors is isolated and this cannot move.
        if (neighbor && this.commonNeighborCount(side) !== 2) {
          result = true;
        }
      });

      return result;
    }

    // Catch-all
    throw new Error('canMove function should have matched a criteria');
  };

  //TODO: change the format... do we even want to have name?
  Hive.Piece.prototype.toString = function() {
    return 'Piece ID ' + this.id + ' (' + this.type + ')';
  };

  Hive.Piece.prototype.listAllContiguousNeighbors = function(idHash) {
    // TODO: add id's to all pieces when placed
    // TODO: skip ghost pieces
    // TODO: rename ghost pieces to empty locations or placeholders
    idHash = idHash || {};
    idHash[this.id] = true;
    _(this.neighbors).each(function(neighbor) {
      idHash[neighbor.id] || neighbor.listAllContiguousNeighbors(idHash);
    });
    return idHash;
  };

  Hive.Piece.prototype.areAllContiguous = function() {
    if (!Hive.Piece.pieces.length) {
      return true;
    }
    // TODO: keep a list of all pieces
    var idHash = Hive.Piece.pieces[0].listAllContiguousNeighbors();
    return _(Hive.Piece.pieces).reduce(function(areAllContiguous, piece) {
      return areAllContiguous && idHash[piece.id];
    }, true);
  };

  // Resets all neighbors to null. Use it to invalidate neighbors (e.g. when a
  // neighbor changes)
  Hive.Piece.prototype.resetNeighbors = function() {
    if (this.type !== null) {
      this.neighbors[0] = null; // -> N
      this.neighbors[1] = null; // -> NE
      this.neighbors[2] = null; // -> SE
      this.neighbors[3] = null; // -> S
      this.neighbors[4] = null; // -> SW
      this.neighbors[5] = null; // -> NW
      this.neighbors[6] = null; // -> ABOVE
      this.neighbors[7] = null; // -> BELOW
    }
  };

  // Connect a given neighbor to a side located on this piece. Warning: This
  // function invalidates all neighbor relationships for this piece and
  // re-associates its neighbors afterward.
  Hive.Piece.prototype.connectToNeighbor = function(neighbor, side) {
    var allNeighbors = this.neighbors;

    // TODO: Clarify this documentation
    // Clearing refs of connected neighbors of moving piece
    // Use neuralizer! on previous neighbors
    _.each(allNeighbors, function(neighbor, side) {
      if (neighbor) {
        neighbor.neighbors[compliment(side)] = null;
      }
    });

    // Reset this piece's neighbors so we can cleanly reattach them below
    this.resetNeighbors();

    if (side === 7) {
      throw new Error("A piece can't move under another piece!");
    }

    // If we're moving on top of another piece, then copy the piece below us's
    // neighbors and return early.
    if (side === 6) {
      this.neighbors[side] = neighbor;
      neighbor.neighbors[compliment(side)] = this;
      return this.neighbors;
    }

    // Reattach new neighbors
    return this.copyNeighbors(neighbor, side);
  };

  // TODO: Document this function
  Hive.Piece.prototype.copyNeighbors = function(neighbor, side) {
    // Don't allow a piece to connect to nothing
    if (!neighbor) { return; }

    // Don't allow a piece to connect to itself
    if (neighbor === this || this.neighbors[side] === neighbor) { return; }

    this.neighbors[side] = neighbor;

    neighbor.neighbors[compliment(side)] = this;

    if (side === 0) {
      this.copyNeighbors(neighbor.neighbors[4], 5);
      this.copyNeighbors(neighbor.neighbors[2], 1);
    }
    else if (side === 1) {
      this.copyNeighbors(neighbor.neighbors[5], 0);
      this.copyNeighbors(neighbor.neighbors[3], 2);
    }
    else if (side === 2) {
      this.copyNeighbors(neighbor.neighbors[4], 3);
      this.copyNeighbors(neighbor.neighbors[0], 1);
    }
    else if (side === 3) {
      this.copyNeighbors(neighbor.neighbors[5], 4);
      this.copyNeighbors(neighbor.neighbors[2], 2);
    }
    else if (side === 4) {
      this.copyNeighbors(neighbor.neighbors[5], 0);
      this.copyNeighbors(neighbor.neighbors[4], 3);
    }
    else if (side === 5) {
      this.copyNeighbors(neighbor.neighbors[1], 0);
      this.copyNeighbors(neighbor.neighbors[3], 4);
    }
  };

  Hive.Piece.prototype.traverse = function(piece, callback, visited) {
    // Store an array of visited pieces
    if (!visited) {
      visited = [];
    }

    // Push this piece onto the visited array so we don't visit it later
    visited.push(piece);

    // Call the callback on the piece
    callback(piece);

    // Traverse the piece's neighbors
    for (var i = 0; i < piece.neighbors.length; i++) {
      var neighbor = piece.neighbors[i];

      // Skip empty neighbors and neighbors we've already visited
      if (!neighbor || visited.indexOf(neighbor)) {
        continue;
      }

      // Traverse another neighbor
      traverse(neighbor, callback, visited);
    }

    return visited;
  };

  return Hive.Piece;
});
