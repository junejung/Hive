var requirejs = require('requirejs');
// Path to serverside config
requirejs.config(require('../../app/public/js/tests-config'));

requirejs(['buster'], function(buster) {
  // Set up BDD-style expectations
  var expect = buster.assertions.expect;
  buster.spec.expose();

});
