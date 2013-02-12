module.exports = {
  nodeRequire: require,
  paths: {
    // Libraries
    backbone   : __dirname + '/vendor/backbone-amd-0.9.10-min',
    bootstrap  : __dirname + '/vendor/bootstrap.min',
    domReady   : __dirname + '/vendor/domReady-2.0.1',
    underscore : __dirname + '/vendor/lodash-1.0.0r3.min',

    // Models
    Hive       : __dirname + '/models/Hive',
    Piece      : __dirname + '/models/Piece',
    Ant        : __dirname + '/models/Ant',
    Beetle     : __dirname + '/models/Beetle',
    GhostPiece : __dirname + '/models/GhostPiece',
    Grasshopper: __dirname + '/models/Grasshopper',
    Queen      : __dirname + '/models/Queen',
    Spider     : __dirname + '/models/Spider'
  }
};
