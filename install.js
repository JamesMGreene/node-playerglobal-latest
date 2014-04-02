'use strict';

var path = require('path');
var getRepo = require('download-github-repo');

var repoId = 'nexussays/playerglobal';
var downloadDir = path.join(__dirname, 'lib');

getRepo(repoId, downloadDir, function(err) {
  if (err) {
    throw new Error('Failed to download "' + repoId + '"!\n' + err);
  }
  console.log('Successfully downloaded "' + repoId + '" to:\n    ' + downloadDir);
});