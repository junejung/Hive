// Declare require.js config in here. Define paths to js files in the paths
// property--that way you don't have to refer to their full pathname in order
// to use them.
//
// NOTES:
// We're using require-jquery, so jquery is built in. No need to include it as
// a library--just require 'jquery' and you're good to go.
//
// Lodash is a drop-in replacement for underscore. Naming it underscore to
// prevent confusion amongst newcomers.

var require = {
  baseUrl: 'js',
  paths: {
    // Libraries
    backbone   : 'vendor/backbone-amd-0.9.10-min',
    bootstrap  : 'vendor/bootstrap.min',
    domReady   : 'vendor/domReady-2.0.1',
    kinetic    : 'vendor/kinetic',
    underscore : 'vendor/lodash-1.0.0r3.min',

    // Models
    Hive       : 'models/Hive',
    Piece      : 'models/Piece',
    Ant        : 'models/Ant',
    Beetle     : 'models/Beetle',
    GhostPiece : 'models/GhostPiece',
    Grasshopper: 'models/Grasshopper',
    Queen      : 'models/Queen',
    Spider     : 'models/Spider'
  },
  shim: {
    'bootstrap' : ['jquery']
  }
};
