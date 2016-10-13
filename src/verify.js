import * as fs from 'fs';
import chalk from 'chalk';
import semver from 'semver-regex';
import { execSync } from 'child_process';
import { join } from 'path';
import { path as rootPath } from 'app-root-path';

export default () => {
  const NODE_VERSION_SPEC = cleanVersion(readFile('.nvmrc') || readFile('.node-version'));
  const CLIENT_NODE_VERSION = cleanVersion(process.version);

  const NPM_VERSION_SPEC = cleanVersion(readFile('.npmrc') || readFile('.npm-version'));
  const CLIENT_NPM_VERSION = execSync(`npm -v`).stdout;

  if (NODE_VERSION_SPEC) {
    const equalVersions = compareVersions(NODE_VERSION_SPEC, CLIENT_NODE_VERSION);
    if (!equalVersions) {
      console.log(chalk.red(`The required node version is ${NODE_VERSION_SPEC} ` +
                      `and you're currently running ${CLIENT_NODE_VERSION}`));
      process.exit(1);
    }
  }
  if (NPM_VERSION_SPEC) {
    const equalVersions = compareVersions(NPM_VERSION_SPEC, CLIENT_NPM_VERSION);
    if (!equalVersions) {
      console.log(chalk.red(`The required npm version is ${NPM_VERSION_SPEC} ` +
                      `and you're currently running ${CLIENT_NPM_VERSION}`));
      process.exit(1);
    }
  }
}

// Returns the contents of the file located at `path`
// where `path` is relative to the project's root
function readFile(path) {
  try {
    return fs.readFileSync(join(rootPath, path), 'utf-8');
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
  const parsedVersion = semver().exec(rawVer);
  if (!parsedVersion) return false;
  return parsedVersion[0].replace(/[a-zA-Z]/ig, '');
}

function compareVersions(a, b) {
  if (!a || !b) {
    throw new Error(`One or more versions were not supplied for comparison`);
  }
  if (a === b) {
    return true
  }
  return false;
}
