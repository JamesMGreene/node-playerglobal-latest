'use strict';

var path = require('path');
var fs = require('fs');
var os = require('os');
var tmpDir = os.tmpdir || os.tmpDir;
var mkdirp = require('mkdirp');

var playerglobal = require('..');

module.exports = {

  "it has the correct `path`": function(test) {
    test.expect(1);
    test.strictEqual(playerglobal.path, path.join(__dirname, '..', 'lib'));
    test.done();
  },

  "it has successfully downloaded the files": function(test) {
    test.expect(3);
    test.strictEqual(fs.statSync(playerglobal.path).isDirectory(), true);
    test.strictEqual(fs.statSync(path.join(playerglobal.path, '10.0')).isDirectory(), true);
    test.strictEqual(fs.statSync(path.join(playerglobal.path, '10.0', 'playerglobal.swc')).isFile(), true);
    test.done();
  },

  "will fail to install into an invalid FLEX_HOME dir": function(test) {
    test.expect(1);
    var BAD_FLEX_HOME = path.join(tmpDir(), 'badFlexHome');
    mkdirp.sync(BAD_FLEX_HOME);
    playerglobal.install(BAD_FLEX_HOME, function(err) {
      test.strictEqual(err instanceof TypeError, true);
      fs.unlink(BAD_FLEX_HOME, function(err) {
        if (err) {
          console.error('Failed to delete tmpdir: ' + BAD_FLEX_HOME);
        }
        test.done();
      });
    });
  },

  "it can successfully install into a FLEX_HOME dir": function(test) {
    test.expect(1);
    var FLEX_HOME = path.join(tmpDir(), 'goodFlexHome');
    mkdirp.sync(path.join(FLEX_HOME, 'frameworks', 'libs', 'player'));
    playerglobal.install(FLEX_HOME, function(err) {
      test.equal(err, null);
      fs.unlink(FLEX_HOME, function(err) {
        if (err) {
          console.error('Failed to delete tmpdir: ' + FLEX_HOME);
        }
        test.done();
      });
    });
  }

};