'use strict';

var path = require('path');
var fs = require('fs');
var rimraf = require('rimraf');
var ncp = require('ncp');

var downloadDir = path.join(__dirname, 'lib');


module.exports = {

  /**
   * The path where the "playerglobal.swc" root dir is located.
   */
  path: downloadDir,

  /**
   * Install these "playerglobal.swc" files into the appropriate location within a Flex SDK directory.
   */
  install: function(FLEX_HOME, done) {
    var playersDir = path.join(FLEX_HOME, 'frameworks', 'libs', 'player');
    if (fs.existsSync(playersDir) && fs.statSync(playersDir).isDirectory()) {
      rimraf(playersDir, function(err) {
        if (err) {
          return done(err);
        }
        ncp(downloadDir, playersDir, function(err) {
          if (err) {
            return done(err);
          }
          done();
        });
      });
    }
    else {
      done(new TypeError('The FLEX_HOME provided does not contain the expected directory structure'));
    }
  }

};