module.exports = {
  nodeRequire: require,
  paths: {
    Hive         : __dirname + '/models/Hive',
    Piece        : __dirname + '/models/Piece',
    Soldier      : __dirname + '/models/Soldier',
    Spider       : __dirname + '/models/Spider',
    Grasshopper  : __dirname + '/models/Grasshopper',
    Beetle       : __dirname + '/models/Beetle',
    underscore   : 'vendor/lodash-1.0.0r3.min',
    backbone     : 'vendor/backbone-amd-0.9.10-min'
  }
};