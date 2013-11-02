module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-karma');

  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js', 'package.json', 'src/**/*.js'],
      options: {
      }
    },
    html2js: {
      options: {
        module: 'templates',
        rename: function(moduleName) {
          return moduleName.substring(moduleName.indexOf('templates/'));
        }
      },
      main: {
        src: ['src/**/*.tpl.html'],
        dest: 'tmp/templates.js'
      }
    },
    karma: {
      options: {
        frameworks: ['jasmine'],
        files: [
          'lib/jquery-1.10.2.js',
          'lib/angular.js',
          'lib/angular-mocks.js',
          'lib/jasmine-matchers.js',
          'lib/moment.js',
          'src/**/*.js',
          'tmp/*.js'],
        browsers: process.env.TRAVIS ? ['Firefox'] : ['Chrome']
      },
      tdd: {
        autoWatch: true
      },
      ci: {
        singleRun: true
      }
    }
  });

  grunt.registerTask('default', ['jshint', 'html2js', 'karma:ci']);
};