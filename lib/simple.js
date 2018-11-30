'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (additionalPackages, options) {
  var pks = (0, _minDash.assign)({}, packages, additionalPackages);

  return new _bpmnModdle2.default(pks, options);
};

var _minDash = require('min-dash');

var _bpmnModdle = require('./bpmn-moddle');

var _bpmnModdle2 = _interopRequireDefault(_bpmnModdle);

var _bpmn = require('../resources/bpmn/json/bpmn.json');

var _bpmn2 = _interopRequireDefault(_bpmn);

var _bpmndi = require('../resources/bpmn/json/bpmndi.json');

var _bpmndi2 = _interopRequireDefault(_bpmndi);

var _dc = require('../resources/bpmn/json/dc.json');

var _dc2 = _interopRequireDefault(_dc);

var _di = require('../resources/bpmn/json/di.json');

var _di2 = _interopRequireDefault(_di);

var _bioc = require('../resources/bpmn-io/json/bioc.json');

var _bioc2 = _interopRequireDefault(_bioc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var packages = {
  bpmn: _bpmn2.default,
  bpmndi: _bpmndi2.default,
  dc: _dc2.default,
  di: _di2.default,
  bioc: _bioc2.default
};