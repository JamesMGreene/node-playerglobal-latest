'use strict';

var path = require('path');
var os = require('os');
var fs = require('fs');
var rimraf = require('rimraf');
var mkdirp = require('mkdirp');
var ncp = require('ncp');
var async = require('async');

var downloadDir = path.join(__dirname, 'lib');


module.exports = {

  /**
   * 
   */
  path: downloadDir,

  /**
   * Install these "playerglobal.swc" files into the appropriate location within a Flex SDK directory
   */
  install: function(FLEX_HOME, done) {
    var playersDir = path.join(FLEX_HOME, 'frameworks', 'libs', 'player');
    if (fs.existsSync(playersDir) && fs.statSync(playersDir).isDirectory()) {
      var tmpDirRoot = os.tmpdir ? os.tmpdir() : os.tmpDir();
      var tmpOldPlayersDir = path.join(tmpDirRoot, 'node-playerglobal');

      var prepOldPlayerStorage = function(done) {
        function cb(err) {
          done(err ? new Error('Failed to prepare the storage location for the old "playerglobal.swc" library collection.\nError: ' + err) : null);
        }

        if (fs.existsSync(tmpOldPlayersDir)) {
          async.series(
            [
              function(done) {
                rimraf(tmpOldPlayersDir, done);
              },
              function(done) {
                mkdirp(tmpOldPlayersDir, done);
              }
            ],
            cb
          );
        }
        else {
          mkdirp(tmpOldPlayersDir, cb);
        }
      };

      var saveOldPlayers = function(done) {
        ncp(playersDir, tmpOldPlayersDir, function(err) {
          done(err ? new Error('Failed to maintain the old "playerglobal.swc" library collection.\nError: ' + err) : null);
        });
      };

      var installNewPlayers = function(done) {
        ncp(downloadDir, playersDir, function(err) {
          done(err ? new Error('Failed to install the new "playerglobal.swc" library collection.\nError: ' + err) : null);
        });
      };

      var restoreNonConflictingOldPlayers = function(done) {
        ncp(tmpOldPlayersDir, playersDir, { clobber: false }, function(err) {
          if (err) {
            console.warn('WARNING: Failed to restore any non-conflicting files from the old "playerglobal.swc" library collection.\nError: ' + err);
          }
          done();
        });
      };

      async.series(
        [
          prepOldPlayerStorage,
          saveOldPlayers,
          installNewPlayers,
          restoreNonConflictingOldPlayers
        ],
        done
      );
    }
    else {
      done(new TypeError('The FLEX_HOME provided does not contain the expected directory structure'));
    }
  }
};

