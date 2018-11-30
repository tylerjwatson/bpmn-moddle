'use strict';

var _expect = require('../expect');

var _expect2 = _interopRequireDefault(_expect);

var _helper = require('../helper');

var _drools = require('../fixtures/json/model/drools');

var _drools2 = _interopRequireDefault(_drools);

var _minDash = require('min-dash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('bpmn-moddle - integration', function () {

  describe('drools:import element', function () {

    var moddle = (0, _helper.createModdle)({ drools: _drools2.default });

    function read(xml, root, opts, callback) {
      return moddle.fromXML(xml, root, opts, callback);
    }

    function fromFile(file, root, opts, callback) {
      var contents = (0, _helper.readFile)('test/fixtures/bpmn/' + file);
      return read(contents, root, opts, callback);
    }

    function write(element, options, callback) {
      if ((0, _minDash.isFunction)(options)) {
        callback = options;
        options = {};
      }

      // skip preamble for tests
      options = (0, _minDash.assign)({ preamble: false }, options);

      moddle.toXML(element, options, callback);
    }

    it('should import', function (done) {

      // when
      fromFile('extension/drools.part.bpmn', 'bpmn:Process', function (err, result) {

        var expected = {
          $type: 'bpmn:Process',
          id: 'Evaluation',
          isExecutable: false,
          extensionElements: {
            $type: 'bpmn:ExtensionElements',
            values: [{
              $type: 'drools:Import',
              name: 'com.example.model.User'
            }]
          }
        };

        // then
        (0, _expect2.default)(result).to.jsonEqual(expected);

        done(err);
      });
    });

    it('should export', function (done) {

      // given
      var importElement = moddle.create('drools:Import', {
        name: 'com.example.model.User'
      });

      var processElement = moddle.create('bpmn:Process', {
        extensionElements: moddle.create('bpmn:ExtensionElements', {
          values: [importElement]
        })
      });

      var expectedXML = '<bpmn:process xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" ' + 'xmlns:drools="http://www.jboss.org/drools">' + '<bpmn:extensionElements>' + '<drools:import name="com.example.model.User" />' + '</bpmn:extensionElements>' + '</bpmn:process>';

      // when
      write(processElement, function (err, result) {

        if (err) {
          return done(err);
        }

        // then
        (0, _expect2.default)(result).to.eql(expectedXML);

        done(err);
      });
    });
  });
});