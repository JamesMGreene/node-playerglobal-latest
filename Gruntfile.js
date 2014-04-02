module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    // Task configuration
    jshint: {
      options: {
        jshintrc: true
      },
      all: ['*.js', 'test/**/*.js']
    },
    nodeunit: {
      all: ['test/**/*.js']
    }
  });

  // These plugins provide necessary tasks
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');


  // Default task
  grunt.registerTask('default', ['jshint', 'nodeunit']);
  // Travis CI task
  grunt.registerTask('travis',  ['jshint', 'nodeunit']);

};
