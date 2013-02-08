define(['Hive', 'underscore'], function(Hive, _) {

  Hive.Piece = function(property){
    this.neighbors = [];
    this.resetNeibors();

    if(property.neighbors){
      this.neighbors = property.neighbors.slice(0);
    }

    if(property.name){
      this.name = property.name;
    }
  };

  var compliment = function(side) {

    if (side == ABOVE){ return BELOW; } // top of another piece

    if (side == BELOW){ return ABOVE; } // under another piece

    if (side >= 3){ return side - 3; }

    return side + 3;
  };

  Hive.Piece.prototype = new Backbone.Model();

  Hive.Piece.prototype.type = 'Piece';

  //TODO: chagne the formet.. do we even want to have name?
  Hive.Piece.prototype.toString = function(){ return this.name+ ' ('+this.type+')'; };

  Hive.Piece.prototype.resetNeibors = function(side){
    this.neighbors[0] = null; // -> N
    this.neighbors[1] = null; // -> NE
    this.neighbors[2] = null; // -> SE
    this.neighbors[3] = null; // -> S
    this.neighbors[4] = null; // -> SW
    this.neighbors[5] = null; // -> NW
    this.neighbors[6] = null; // -> ABOVE
    this.neighbors[7] = null; // -> BELOW
  };

  Hive.Piece.prototype.connectToNeighbor = function(neighbor, side){
    var allNeighbors = this.neighbors;

    _.each(allNeighbors, function(neighbor, s){
      if(neighbor !== null){
        neighbor.neighbors[compliment(s)] = null;
      }
    });

    this.resetNeibors();

    if(side === BELOW) {

      this.neighbors[side] = neighbor;
      neighbor.neighbors[compliment(side)] = this;

      return;
    }

    if(side === ABOVE) {
      throw new Error("A piece can't move under another piece!");
    }

    this.copyNeighbors(neighbor, side);

  };

  Hive.Piece.prototype.copyNeighbors = function(){
    //can't connect to nothing , ourself or if already connected
    if(!neighbor){ return; }
    if(neighbor === this || this.neighbors[side] === neighbor) { return; }

    this.neighbor[side] = neighbor;

    neighbor.neighbors[compliment(side)] = this;

    if(side === N){
      this.copyNeighbors(neighbor.neighbors[SW], NW);
      this.copyNeighbors(neighbor.neighbors[SE], NE);
    }
    else if (side === S) {
      this.copyNeighbors(neighbor.neighbors[NW], SW);
      this.copyNeighbors(neighbor.neighbors[NE], SE);
    }
    else if (side === NE) {
      this.copyNeighbors(neighbor.neighbors[NW], N);
      this.copyNeighbors(neighbor.neighbors[S], SE);
    }
    else if (side === SE) {
      this.copyNeighbors(neighbor.neighbors[SW], S);
      this.copyNeighbors(neighbor.neighbors[N], NE);
    }
    else if (side === NW) {
      this.copyNeighbors(neighbor.neighbors[NE], N);
      this.copyNeighbors(neighbor.neighbors[S], SW);
    }
    else if (side === SW) {
      this.copyNeighbors(neighbor.neighbors[NW], N);
      this.copyNeighbors(neighbor.neighbors[SW], S);
    }
  };

  return Hive.Piece;

});
