'use strict';

var _helper = require('../../helper');

var _camunda = require('../../fixtures/json/model/camunda');

var _camunda2 = _interopRequireDefault(_camunda);

var _xmlHelper = require('../../xml-helper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('bpmn-moddle - integration', function () {

  describe('camunda extension', function () {

    var moddle = (0, _helper.createModdle)({ camunda: _camunda2.default });

    function fromFile(file, done) {
      (0, _xmlHelper.fromFile)(moddle, file, done);
    }

    describe('should serialize valid BPMN 2.0 after read', function () {

      this.timeout(15000);

      it('inputOutput', function (done) {

        // given
        fromFile('test/fixtures/bpmn/extension/camunda/inputOutput.bpmn', function (err, result) {

          if (err) {
            return done(err);
          }

          // when
          (0, _xmlHelper.toXML)(result, { format: true }, function (err, xml) {
            (0, _xmlHelper.validate)(err, xml, done);
          });
        });
      });
    });
  });
});