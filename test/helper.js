'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureDirExists = ensureDirExists;
exports.readFile = readFile;
exports.createModdle = createModdle;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _ = require('../');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ensureDirExists(dir) {

  if (!_fs2.default.existsSync(dir)) {
    _fs2.default.mkdirSync(dir);
  }
}

function readFile(filename) {
  return _fs2.default.readFileSync(filename, { encoding: 'UTF-8' });
}

function createModdle(additionalPackages, options) {
  return new _2.default(additionalPackages, options);
}