/*jshint node:true*/
/*globals define: true*/
"use strict";

module.exports = {
  nodeRequire: require,
  paths: {
    sockets    : __dirname + '/sockets',
    Bug        : __dirname + '/models/Bug',
    Queen      : __dirname + '/models/Queen',
    Soldier    : __dirname + '/models/Soldier',
    Spider     : __dirname + '/models/Spider',
    Grasshopper: __dirname + '/models/Grasshopper',
    Beetle     : __dirname + '/models/Beetle'
  }
};
