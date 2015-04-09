[![Build Status](https://travis-ci.org/JamesMGreene/node-playerglobal-latest.png?branch=master)](https://travis-ci.org/JamesMGreene/node-playerglobal-latest)

# node-playerglobal-latest

A Node.js module wrapper for downloading/installing _**ALL**_ versions of the "playerglobal.swc" API library in order to target all modern versions of Flash Player. Downloads the latest versions upon install, rather than during prepublish.

As such, a consumer can always just run `npm update`/`npm install` to get the latest updates despite the module's version being unchanged. A bastardization of [Semantic Versioning](http://semver.org/), yes, but very useful nonetheless.

If you don't like this non-idempotent behavior, check out [JamesMGreene/node-playerglobal](https://github.com/JamesMGreene/node-playerglobal) instead.


## Install

```shell
npm install playerglobal-latest
```


## Usage

```js
var pg = require('playerglobal-latest');

console.log('PlayerGlobal root path: ' + pg.path);

// Install the PlayerGlobal dir into a Flex SDK dir
var FLEX_HOME = process.env['FLEX_HOME'] || __dirname;
pg.install(FLEX_HOME, function(err) {
  if (err) {
    console.error('Failed to install the Flash API libraries!\nError: ' + err);
  }
});
```
