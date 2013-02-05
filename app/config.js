/*jshint node:true*/
/*globals define: true*/
"use strict";

module.exports = {
  nodeRequire: require,
  paths: {
    sockets: __dirname + '/sockets',
    Bug    : __dirname + '/models/Bug',
    Queen  : __dirname + '/models/Queen'
  }
};
