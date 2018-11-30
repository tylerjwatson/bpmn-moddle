'use strict';

var _expect = require('../../expect');

var _expect2 = _interopRequireDefault(_expect);

var _helper = require('../../helper');

var _xmlHelper = require('../../xml-helper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('bpmn-moddle - edit', function () {

  var moddle = (0, _helper.createModdle)();

  function fromFile(file, done) {
    (0, _xmlHelper.fromFile)(moddle, file, done);
  }

  describe('save after change', function () {

    it('should serialize changed name', function (done) {

      // given
      fromFile('test/fixtures/bpmn/simple.bpmn', function (err, result) {

        if (err) {
          return done(err);
        }

        result.rootElements[0].name = 'OTHER PROCESS';

        // when
        (0, _xmlHelper.toXML)(result, { format: true }, function (err, xml) {
          (0, _expect2.default)(xml).to.contain('name="OTHER PROCESS"');

          done(err);
        });
      });
    });
  });

  describe('dataObjectRef', function () {

    it('should update', function (done) {

      fromFile('test/fixtures/bpmn/data-object-reference.bpmn', function (err, result) {

        // given
        var process = result.rootElements[0],
            dataObjectReference = process.flowElements[0];

        // when
        // creating new data object
        var dataObject_2 = moddle.create('bpmn:DataObject', { id: 'dataObject_2' });

        // adding data object to its parent (makes sure it is contained in the XML)
        process.flowElements.push(dataObject_2);

        // set reference to the new data object
        dataObjectReference.dataObjectRef = dataObject_2;

        (0, _xmlHelper.toXML)(result, { format: true }, function (err, xml) {

          // then
          (0, _expect2.default)(xml).to.contain('<bpmn:dataObject id="dataObject_2" />');
          (0, _expect2.default)(xml).to.contain('<bpmn:dataObjectReference id="DataObjectReference_1" dataObjectRef="dataObject_2" />');

          done(err);
        });
      });
    });
  });
});