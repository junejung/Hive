/*jshint node:true, laxcomma:true*/
"use strict";

exports.index = function(req, res) {
  res.render('index', { title: 'Hive.js' });
};
