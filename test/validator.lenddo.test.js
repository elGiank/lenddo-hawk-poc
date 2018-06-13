const payloadValidator = require('../middleware/payloadValidator/payloadValidator');
const BaseValidator = require('../middleware/payloadValidator/basePayload');
const ScoreValidator = require('../middleware/payloadValidator/scoreValidator');
const VerificationValidator = require('../middleware/payloadValidator/verificationValidator');
const DecisionValidator = require('../middleware/payloadValidator/decisionValidator');
const FeaturesValidator = require('../middleware/payloadValidator/featuresValidator');
const MultipleVerificationValidator = require('../middleware/payloadValidator/multipleVerificationValidator');
const UnknownEventValidator = require('../middleware/payloadValidator/unknownEventValidator');

const chai = require('chai');
const should = chai.should();
const sinon = require('sinon');

describe('Request payload validators', () => {

    it('should accept valid base payload format', function (done) {
        let payload = {
            "client_id": "12345678-05468565",
            "event": "event_name",
            "result": { "foo": "bar" }
        };

        let result = BaseValidator(payload);
        result.should.be.eq(true);

        done();
    });

    it('should reject payloads with unknown format', function (done) {
        let payload = {
            "dni": 19876543,
            "foo": "bar"
        };

        let result = BaseValidator(payload);
        result.should.be.eq(false);

        done();
    });

    it('should accept valid payload for score result', function (done) {
        let payload = {
            "client_id": "12345678-05468565",
            "event": "event_name",
            "result": { "score": "456" }
        };

        let isApplicable = ScoreValidator.isApplicable('scoring_complete');
        let isValid = ScoreValidator.isValid(payload);

        isApplicable.should.be.eql(true);
        isValid.should.be.eql(true);

        done();
    });

    it('should accept valid payload for verification result', function (done) {
        let payload = {
            "client_id": "12345678-05468565",
            "event": "event_name",
            "result": { "foo": "bar" }
        };

        let isApplicable = VerificationValidator.isApplicable('verification_complete');
        let isValid = VerificationValidator.isValid(payload);

        isApplicable.should.be.eql(true);
        isValid.should.be.eql(true);

        done();
    });

    it('should accept valid payload for decision result', function (done) {
        let payload = {
            "client_id": "12345678-05468565",
            "event": "event_name",
            "result": { "foo": "bar" }
        };

        let isApplicable = DecisionValidator.isApplicable('application_decision_complete');
        let isValid = DecisionValidator.isValid(payload);

        isApplicable.should.be.eql(true);
        isValid.should.be.eql(true);

        done();
    });

    it('should accept valid payload for features result', function (done) {
        let payload = {
            "client_id": "12345678-05468565",
            "event": "event_name",
            "result": { "foo": "bar" }
        };

        let isApplicable = FeaturesValidator.isApplicable('application_features_complete');
        let isValid = FeaturesValidator.isValid(payload);

        isApplicable.should.be.eql(true);
        isValid.should.be.eql(true);

        done();
    });

    it('should accept valid payload for multiple verification result', function (done) {
        let payload = {
            "client_id": "12345678-05468565",
            "event": "event_name",
            "result": { "foo": "bar" }
        };

        let isApplicable = MultipleVerificationValidator.isApplicable('application_multiple_verification_complete');
        let isValid = MultipleVerificationValidator.isValid(payload);

        isApplicable.should.be.eql(true);
        isValid.should.be.eql(true);

        done();
    });

    it('should reject payloads for unknown events', function (done) {
        let payload = {
            "client_id": "12345678-05468565",
            "event": "event_name",
            "result": { "foo": "bar" }
        };

        let isApplicable = UnknownEventValidator.isApplicable('unknown_event');
        let isValid = UnknownEventValidator.isValid(payload);

        isApplicable.should.be.eql(true);
        isValid.should.be.eql(false);

        done();
    });

    it('should call next when payload is valid', function (done) {

        let req = {
            body: {
                "client_id": "12345678-05468565",
                "event": "scoring_complete",
                "result": { "score": "456" }
            }
        };
        let next = function() { };
        let nextSpy = sinon.spy(next);

        payloadValidator(req, undefined, nextSpy);

        sinon.assert.calledOnce(nextSpy);

        done();
    });

    it('should call status 400 when payload is invalid', function (done) {

        let req = {
            body: {
                "client_id": "12345678-05468565",
                "event": "bad_event_name",
                "result": { "score": "456" }
            }
        };
        let res = {
            status: (number) => {
                return {end: () => { }}
            },
        };
        let next = function() { };

        let statusSpy = sinon.spy(res, 'status');

        payloadValidator(req, res, next);

        sinon.assert.calledOnce(statusSpy);
        sinon.assert.calledWith(statusSpy, 400);

        done();
    });

});