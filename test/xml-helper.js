'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromFile = fromFile;
exports.fromFilePart = fromFilePart;
exports.fromValidFile = fromValidFile;
exports.toXML = toXML;
exports.validate = validate;

var _expect = require('./expect');

var _expect2 = _interopRequireDefault(_expect);

var _xsdSchemaValidator = require('xsd-schema-validator');

var _xsdSchemaValidator2 = _interopRequireDefault(_xsdSchemaValidator);

var _helper = require('./helper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BPMN_XSD = 'test/fixtures/xsd/BPMN20.xsd';

function fromFile(moddle, file, done) {
  return fromFilePart(moddle, file, 'bpmn:Definitions', done);
}

function fromFilePart(moddle, file, type, done) {
  var fileContents = (0, _helper.readFile)(file);

  moddle.fromXML(fileContents, type, done);
}

function fromValidFile(moddle, file, done) {
  var fileContents = (0, _helper.readFile)(file);

  validate(null, fileContents, function (err) {

    if (err) {
      return done(err);
    }

    moddle.fromXML(fileContents, 'bpmn:Definitions', done);
  });
}

function toXML(element, opts, done) {
  element.$model.toXML(element, opts, done);
}

function validate(err, xml, done) {

  if (err) {
    return done(err);
  }

  if (!xml) {
    return done(new Error('XML is not defined'));
  }

  _xsdSchemaValidator2.default.validateXML(xml, BPMN_XSD, function (err, result) {

    if (err) {
      return done(err);
    }

    (0, _expect2.default)(result.valid).to.be.true;
    done();
  });
}