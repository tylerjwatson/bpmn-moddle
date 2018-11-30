'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _chai = require('chai');

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function () {
    return _chai.expect;
  }
});

var _chai2 = _interopRequireDefault(_chai);

var _matchers = require('./matchers');

var _matchers2 = _interopRequireDefault(_matchers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// add matchers
_chai2.default.use(_matchers2.default);

// expose chai expect