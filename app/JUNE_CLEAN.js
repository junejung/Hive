var Hive = {};

(function() {
  // "Constants"
  var N = 0;
  var NE = 1;
  var SE = 2;
  var S = 3;
  var SW = 4;
  var NW = 5;
  var ABOVE = 6;
  var BELOW = 7;

  Hive.sides = {
    N: N,
    NE: NE,
    SE: SE,
    S: S,
    SW: SW,
    NW: NW,
    ABOVE: ABOVE,
    BELOW: BELOW
  };

  Hive.sideNames = ['N', 'NE', 'SE', 'S', 'SW', 'NW', 'ABOVE', 'BELOW'];

  /*
    0 <-> 3
    1 <-> 4
    2 <-> 5
  */
  var compliment = function(side) {
      // Piece on top of another piece
      if(side == ABOVE) return BELOW;

      // Piece under another piece
      if(side == BELOW) return ABOVE;

      // Wrap around if side causes us to go over 5
      if(side >= 3) return side - 3;

      // Move around by 3
      return side + 3;
    };


  /*
                 0 (N)
             ___________
            /           \
    5 (NW) /             \ 1 (NE)
          /    6 (above)  \
          \    7 (below)  /
    4 (SW) \             / 2 (SE)
            \___________/

                 3 (S)
  */
  Hive.Piece = function(options) {
    this.neighbors = [];
    this.resetNeighbors();

    // Copy supplied neighbors
    if(options.neighbors) this.neighbors = options.neighbors.slice(0);

    if(options.name) this.name = options.name;
  };

  Hive.Piece.prototype.type = 'Piece';

  Hive.Piece.prototype.toString = function() {
    return this.name + ' (' + this.type + ')';
  };

  Hive.Piece.prototype.resetNeighbors = function(side) {
    this.neighbors[0] = null; // 0 (N)
    this.neighbors[1] = null; // 1 (NE)
    this.neighbors[2] = null; // 2 (SE)
    this.neighbors[3] = null; // 3 (S)
    this.neighbors[4] = null; // 4 (SW)
    this.neighbors[5] = null; // 5 (NW)
    this.neighbors[6] = null; // 6 (Above)
    this.neighbors[7] = null; // 7 (Below)
  };

  Hive.Piece.prototype.connectToNeighbor = function(neighbor, side) {
    // Reset our neighbors
    this.resetNeighbors();

    // Special cases
    if(side === BELOW) {
      // Add the neighbor on ourself
      this.neighbors[side] = neighbor;

      // Add ourself on the neighbor
      neighbor.neighbors[compliment(side)] = this;

      return;
    }

    if(side === ABOVE) {
      // Can only move on top
      throw new Error("A piece can't move under another piece!");
    }

    // Find neighbors given our location
    this.copyNeighbors(neighbor, side);
  };

  // I don't know if this works!
  Hive.Piece.prototype.copyNeighbors = function(neighbor, side) {
    // Don't connect to nothing
    if(!neighbor) return;

    // Don't connect to ourself, don't connect if already connected
    if(neighbor === this || this.neighbors[side] === neighbor) return;

    // Add the neighbor on ourself
    this.neighbors[side] = neighbor;

    // Add ourself on the neighbor
    neighbor.neighbors[compliment(side)] = this;

    if(side === N) {
      this.copyNeighbors(neighbor.neighbors[SW], NW);
      this.copyNeighbors(neighbor.neighbors[SE], NE);
    } else if(side === S) {
      this.copyNeighbors(neighbor.neighbors[NW], SW);
      this.copyNeighbors(neighbor.neighbors[NE], SE);
    } else if(side === NE) {
      this.copyNeighbors(neighbor.neighbors[NW], N);
      this.copyNeighbors(neighbor.neighbors[S], SE);
    } else if(side === SE) {
      this.copyNeighbors(neighbor.neighbors[SW], S);
      this.copyNeighbors(neighbor.neighbors[N], NE);
    } else if(side === NW) {
      this.copyNeighbors(neighbor.neighbors[NE], N);
      this.copyNeighbors(neighbor.neighbors[S], SW);
    } else if(side === SW) {
      this.copyNeighbors(neighbor.neighbors[NW], N);
      this.copyNeighbors(neighbor.neighbors[SW], S);
    }


  };

  Hive.Piece.prototype.traverse = function(piece, callback, visited){
    if (!visited)
      visited = [];

    // Store an array of visited pieces
    visited.push(piece);

    // Call the callback on the piece
    callback(piece);

    // Traverse the pieces neighbors
    for (var i = 0; i < piece.neighbors.length; i++) {
      var neighbor = piece.neighbors[i];

      // Skip empty neighbors and neighbors we've visited
      if (!neighbor|| ~visited.indexOf(neighbor))
        continue;

      traverse(neighbor, callback, visited);
    }

    return visited;
  };

// MAKE GHOST PIECE TAKE PLACE OF ALL NULLs

  /*
    QueenBee
    Can move 1 space at a time
  */
  Hive.QueenBee = function() {
    // Call parent constructor
    Hive.Piece.apply(this, arguments);
  };

  // Inherit from Piece
  Hive.QueenBee.prototype = Object.create(Hive.Piece.prototype);

  Hive.QueenBee.prototype.type = 'QueenBee';

  Hive.QueenBee.prototype.canMove = function(direction) {
    // A queen bee can move out of it's current location

    // A queen bee can't move onto another piece
    if(this.neighbors[direction]) return false;

    // Get the left and right directions
    var left = direction === 0 ? 5 : direction - 1;
    var right = direction === 5 ? 0 : direction + 1;

    // If the left and right are both occupied, we can't move
    if(this.neighbors[left] && this.neighbors[right]) return false;
    // If left and right are both unoccupied, we can't move
    if(!this.neighbors[left] && !this.neighbors[right]) return false;


    // Otherwise, we're clear
    return true;
  };

  Hive.QueenBee.prototype.possibleMoves = function() {
    // called after QueenBee is selected
    var validDirections = [];
    // loop over QueenBee.neighbors array, call QueenBee.canMove() @ each iteration
    for (var i = 0; i < this.neighbors.length-2; i++) {
      if(this.canMove(i)){
        validDirections.push(i);
      }
    }
    // using validDirections check if the resulting move has at least one neighbor
      // return available neighbors and sides
  };

  Hive.QueenBee.prototype.isSurrounded = function() {
    var self = this;
    var currentNeighbors = _.filter(self.neighbors, function(neighbor) {
      if (neighbor && (self.neighbors.indexOf(neighbor) !== 6 || self.neighbors.indexOf(neighbor) !== 7)){
        return neighbor;
      }
    });
    if (currentNeighbors.length === 6) {
      console.log('GAME OVER!');
    }
  };

  Hive.QueenBee.prototype.move = function () {
    // need to check if movement would detach from main hive cluster
    // move to the valid location
  };


  /*
    Beetle
    Can move 1 space at a time in any direction
    Can move on top of other pieces
  */
  Hive.Beetle = function() {
    // Call parent constructor
    Hive.Piece.apply(this, arguments);
  };

  // Inherit from Piece
  Hive.Beetle.prototype = Object.create(Hive.Piece.prototype);

  Hive.Beetle.prototype.type = 'Beetle';

  Hive.Beetle.prototype.canMove = function(direction) {
    // Beetle can move anywhere, except if it would leave another piece detached
    var left = direction === 0 ? 5 : direction - 1;
    var right = direction === 5 ? 0 : direction + 1;
    // If left and right are both unoccupied, we can't move
    if(!this.neighbors[left] && !this.neighbors[right]) return false;

    // Otherwise, we're clear
    return true
  };

  // TODO: figure out what to return to show valid moves to player
  Hive.Beetle.prototype.possibleMoves = function() {
    // called after Beetle is selected
    var validDirections = [];
    // loop over Beetle.neighbors array, call Beetle.canMove() @ each iteration
    for (var i = 0; i < this.neighbors.length-2; i++) {
      if(this.canMove(i)){
        validDirections.push(i);
      }
    }

    return validDirections;
  };

  Hive.Beetle.prototype.move = function () {
    // need to check if movement would detach from main hive cluster
    // move to the valid location
  };

  /*
    Ant
    Can move around other pieces
  */
  Hive.Ant = function() {
    // Call parent constructor
    Hive.Piece.apply(this, arguments);
  };

  // Inherit from Piece
  Hive.Ant.prototype = Object.create(Hive.Piece.prototype);

  Hive.Ant.prototype.type = 'Ant';

  Hive.Ant.prototype.canMove = function(direction) {
    // An ant can't move onto another piece
    if(this.neighbors[direction]) return false;

    // Get the left and right directions
    var left = direction === 0 ? 5 : direction - 1;
    var right = direction === 5 ? 0 : direction + 1;

    // If the left and right are both occupied, we can't move
    if(this.neighbors[left] && this.neighbors.right) return false;

    // Otherwise, we're clear
    return true;
  };

  /*
    Grasshopper
    Can move 1 space at a time in any direction
    Can move on top of other pieces
  */
  Hive.Grasshopper = function() {
    // Call parent constructor
    Hive.Piece.apply(this, arguments);
  };

  // Inherit from Piece
  Hive.Grasshopper.prototype = Object.create(Hive.Piece.prototype);

  Hive.Grasshopper.prototype.type = 'Grasshopper';

  Hive.Grasshopper.prototype.canMove = function(direction) {
    if (this.neighbors[direction]) {
      return true;
    } else {
      return false;
    }
  };

  // TODO: figure out what to return to show valid moves to player
  Hive.Grasshopper.prototype.possibleMoves = function() {
    // called after Grasshopper is selected
    var validDirections = [];
    // loop over Beetle.neighbors array, call Beetle.canMove() @ each iteration
    for (var i = 0; i < this.neighbors.length-2; i++) {
      if(this.canMove(i)){
        validDirections.push(i);
      }
    }

    return validDirections;
  };

  Hive.Grasshopper.prototype.move = function () {
    // need to check if movement would detach from main hive cluster
    // move to the valid location
  };

}());
