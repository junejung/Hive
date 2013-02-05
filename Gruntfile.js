module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    meta : {
      pkg    : grunt.file.readJSON('package.json'),
      banner : '/*! <%= meta.pkg.title || meta.pkg.name %> - v<%= meta.pkg.version %> - ' +
               '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
               '<%= meta.pkg.homepage ? "* " + meta.pkg.homepage + "\\n" : "" %>' +
               '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= meta.pkg.author.name %>;' +
               ' Licensed <%= _.pluck(meta.pkg.licenses, "type").join(", ") %> */\n',

      jade   : ['server/views/**/*.jade'],
      src : {
        app    : ['app/**/*.js', '!app/public/js/vendor/**'],
        spec   : ['app/js/**/*.js', '!app/js/lib/**']
      }
    },

    requirejs: {
      // TODO: Test this and use shared require-config.js
      options: {
        baseUrl: 'app/public/js',
        name: 'main',
        out: 'app/public/js/main.min.js',
        paths: {
          jquery       : 'vendor/require-jquery.min',
          underscore   : 'vendor/lodash-1.0.0r3.min',
          backbone     : 'vendor/backbone-amd-0.9.10-min',
          crafty       : 'vendor/crafty-0.5.3.min',
          io           : 'node_modules/socket.io/node_modules/socket.io-client/dist/socket.io'
        }
      },
      dev: {
        options: {
          optimize: 'none',
        }
      },
      dist: {
        options: {
          optimize: 'uglify2',
        }
      }
    },

    buster: {
      // Only need to specify the name of each test group here. Test groups can
      // be found in spec/buster.js.
      app: {},
      options: {
        config: 'spec/buster.js'
      }
    },

    jshint: {
      app  : '<%= meta.src.app %>',
      spec : '<%= meta.src.spec %>',
      all  : [
        'Gruntfile.js',
        '<%= meta.src.app %>',
        '<%= meta.src.spec %>'
      ],
      dist : 'client/js/main.min.js',
      options: {
        jshintrc: '.jshintrc'
      }
    },

    watch: {
      app: {
        files: '<%= meta.src.app %>',
        tasks: ['jshint:app']
      }
    }
  });

  // Load third-party modules
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-plugin-buster');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Define tasks
  grunt.registerTask('dev', ['jshint:all']);
  grunt.registerTask('dist', ['jshint:dist']);
  // Add jobs here that should run before each commit
  grunt.registerTask('precommit', ['jshint:all', 'buster:app']);

  // Define default task
  grunt.registerTask('default', ['dev']);
};
