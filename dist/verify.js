'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var fs = _interopRequireWildcard(_fs);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _semverRegex = require('semver-regex');

var _semverRegex2 = _interopRequireDefault(_semverRegex);

var _child_process = require('child_process');

var _path = require('path');

var _appRootPath = require('app-root-path');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = function () {
  var NODE_VERSION_SPEC = cleanVersion(readFile('.nvmrc') || readFile('.node-version'));
  var CLIENT_NODE_VERSION = cleanVersion(process.version);

  var NPM_VERSION_SPEC = cleanVersion(readFile('.npmrc'));
  var CLIENT_NPM_VERSION = (0, _child_process.execSync)('npm -v').stdout;

  if (NODE_VERSION_SPEC) {
    var equalVersions = compareVersions(NODE_VERSION_SPEC, CLIENT_NODE_VERSION);
    if (!equalVersions) {
      console.log(_chalk2.default.red('The required node version is ' + NODE_VERSION_SPEC + ' ' + ('and you\'re currently running ' + CLIENT_NODE_VERSION)));
      process.exit(1);
    }
  }
  if (NPM_VERSION_SPEC) {
    var _equalVersions = compareVersions(NPM_VERSION_SPEC, CLIENT_NPM_VERSION);
    if (!_equalVersions) {
      console.log(_chalk2.default.red('The required npm version is ' + NPM_VERSION_SPEC + ' ' + ('and you\'re currently running ' + CLIENT_NPM_VERSION)));
      process.exit(1);
    }
  }
};

// Returns the contents of the file located at `path`
// where `path` is relative to the project's root


function readFile(path) {
  try {
    return fs.readFileSync((0, _path.join)(_appRootPath.path, path), 'utf-8');
  } catch (e) {
    if (e.code === 'ENOENT') {
      return false;
    } else {
      throw e;
    }
  }
}

// Parses and otherwise cleans up a raw semver string
function cleanVersion(rawVer) {
  var parsedVersion = (0, _semverRegex2.default)().exec(rawVer);
  if (!parsedVersion) return false;
  return parsedVersion[0].replace(/[a-zA-Z]/ig, '');
}

function compareVersions(a, b) {
  if (!a || !b) {
    throw new Error('One or more versions were not supplied for comparison');
  }
  if (a === b) {
    return true;
  }
  return false;
}