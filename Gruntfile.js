'use strict';

module.exports = function (grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Configurable paths
  var config = {
    app: 'application',
    dist: 'dist'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    pkg: grunt.file.readJSON('package.json'),
    config: config,

    // JS related configs

    concat: {
      dist: {
        src: [
          'node_modules/jquery/dist/jquery.js',
          '<%= config.app %>/js/**/*.js'
        ],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          '<%= config.dist %>/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },

    // CSS related configs

    cssmin: {
      target: {
        files: {
          '<%= config.dist %>/<%= pkg.name %>.min.css':
            [
              'node_modules/normalize.css/normalize.css',
              '<%= config.app %>/**/*.css'
            ]
        }
      }
    },

    // APPCACHE related configs
    manifest: {
      generate: {
        options: {
          basePath: './',
          headcomment: " <%= pkg.name %> v<%= pkg.version %>",
          hash: true,
          master: ['index.html']
        },
        src: [
          'index.html',
          '<%= config.dist %>/media/*.*',
          '<%= config.dist %>/*.min.js',
          '<%= config.dist %>/*.min.css'
        ],
        dest: 'manifest.appcache'
      }
    }

  });

  grunt.registerTask('build', ['concat', 'uglify', 'cssmin', 'manifest']);

  grunt.registerTask('default', ['build']);
};
