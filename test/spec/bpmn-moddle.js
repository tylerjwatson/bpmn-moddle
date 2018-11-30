'use strict';

var _expect = require('../expect');

var _expect2 = _interopRequireDefault(_expect);

var _helper = require('../helper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('bpmn-moddle', function () {

  var moddle = (0, _helper.createModdle)();

  describe('parsing', function () {

    it('should publish type', function () {
      // when
      var type = moddle.getType('bpmn:Process');

      // then
      (0, _expect2.default)(type).to.exist;
      (0, _expect2.default)(type.$descriptor).to.exist;
    });

    it('should redefine property', function () {

      // when
      var type = moddle.getType('bpmndi:BPMNShape');

      // then
      (0, _expect2.default)(type).to.exist;

      var descriptor = type.$descriptor;

      (0, _expect2.default)(descriptor).to.exist;
      (0, _expect2.default)(descriptor.propertiesByName['di:modelElement']).to.eql(descriptor.propertiesByName['bpmndi:bpmnElement']);
    });
  });

  describe('creation', function () {

    it('should create SequenceFlow', function () {
      var sequenceFlow = moddle.create('bpmn:SequenceFlow');

      (0, _expect2.default)(sequenceFlow.$type).to.eql('bpmn:SequenceFlow');
    });

    it('should create Definitions', function () {
      var definitions = moddle.create('bpmn:Definitions');

      (0, _expect2.default)(definitions.$type).to.eql('bpmn:Definitions');
    });

    it('should create Process', function () {
      var process = moddle.create('bpmn:Process');

      (0, _expect2.default)(process.$type).to.eql('bpmn:Process');
      (0, _expect2.default)(process.$instanceOf('bpmn:FlowElementsContainer')).to.be.true;
    });

    it('should create SubProcess', function () {
      var subProcess = moddle.create('bpmn:SubProcess');

      (0, _expect2.default)(subProcess.$type).to.eql('bpmn:SubProcess');
      (0, _expect2.default)(subProcess.$instanceOf('bpmn:InteractionNode')).to.be.true;
    });

    describe('defaults', function () {

      it('should init Gateway', function () {
        var gateway = moddle.create('bpmn:Gateway');

        (0, _expect2.default)(gateway.gatewayDirection).to.eql('Unspecified');
      });

      it('should init BPMNShape', function () {
        var bpmnEdge = moddle.create('bpmndi:BPMNEdge');

        (0, _expect2.default)(bpmnEdge.messageVisibleKind).to.eql('initiating');
      });

      it('should init EventBasedGateway', function () {
        var gateway = moddle.create('bpmn:EventBasedGateway');

        (0, _expect2.default)(gateway.eventGatewayType).to.eql('Exclusive');
      });

      it('should init CatchEvent', function () {
        var event = moddle.create('bpmn:CatchEvent');

        (0, _expect2.default)(event.parallelMultiple).to.eql(false);
      });

      it('should init ParticipantMultiplicity', function () {
        var participantMultiplicity = moddle.create('bpmn:ParticipantMultiplicity');

        (0, _expect2.default)(participantMultiplicity.minimum).to.eql(0);
        (0, _expect2.default)(participantMultiplicity.maximum).to.eql(1);
      });

      it('should init Activity', function () {
        var activity = moddle.create('bpmn:Activity');

        (0, _expect2.default)(activity.startQuantity).to.eql(1);
        (0, _expect2.default)(activity.completionQuantity).to.eql(1);
      });
    });
  });

  describe('property access', function () {

    describe('singleton properties', function () {

      it('should set attribute', function () {

        // given
        var process = moddle.create('bpmn:Process');

        // assume
        (0, _expect2.default)(process.get('isExecutable')).not.to.exist;

        // when
        process.set('isExecutable', true);

        // then
        (0, _expect2.default)(process).to.jsonEqual({
          $type: 'bpmn:Process',
          isExecutable: true
        });
      });

      it('should set attribute (ns)', function () {

        // given
        var process = moddle.create('bpmn:Process');

        // when
        process.set('bpmn:isExecutable', true);

        // then
        (0, _expect2.default)(process).to.jsonEqual({
          $type: 'bpmn:Process',
          isExecutable: true
        });
      });

      it('should set id attribute', function () {

        // given
        var definitions = moddle.create('bpmn:Definitions');

        // when
        definitions.set('id', 10);

        // then
        (0, _expect2.default)(definitions).to.jsonEqual({
          $type: 'bpmn:Definitions',
          id: 10
        });
      });
    });

    describe('builder', function () {

      it('should create simple hierarchy', function () {

        // given
        var definitions = moddle.create('bpmn:Definitions');
        var rootElements = definitions.get('bpmn:rootElements');

        var process = moddle.create('bpmn:Process');
        var collaboration = moddle.create('bpmn:Collaboration');

        // when
        rootElements.push(collaboration);
        rootElements.push(process);

        // then
        (0, _expect2.default)(rootElements).to.eql([collaboration, process]);
        (0, _expect2.default)(definitions.rootElements).to.eql([collaboration, process]);

        (0, _expect2.default)(definitions).to.jsonEqual({
          $type: 'bpmn:Definitions',
          rootElements: [{ $type: 'bpmn:Collaboration' }, { $type: 'bpmn:Process' }]
        });
      });
    });
  });
});