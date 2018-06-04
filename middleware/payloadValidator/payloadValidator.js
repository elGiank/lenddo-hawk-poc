const BaseValidator = require('./basePayload');
const PayLoadValidator = require('../../lib/strategys/payloadValidator');
const ScoreValidator = require('./scoreValidator');
const VerificationValidator = require('./verificationValidator');
const DecisionValidator = require('./decisionValidator');
const FeaturesValidator = require('./featuresValidator');
const MultipleVerificationValidator = require('./multipleVerificationValidator');
const UnknownEventValidator = require('./unknownEventValidator');


const payloadValidator = (req, res, next) => {
    const payload = req.body;
    if(!BaseValidator(payload)) {
        res.status(400).end();
    }
    else {
        let strategies = [
            new PayLoadValidator(ScoreValidator),
            new PayLoadValidator(VerificationValidator),
            new PayLoadValidator(DecisionValidator),
            new PayLoadValidator(FeaturesValidator),
            new PayLoadValidator(MultipleVerificationValidator),
            new PayLoadValidator(UnknownEventValidator) //this should be the last strategy
        ];

        let strategy = strategies.find((strategy) => {
            return strategy.isApplicable(payload.event);
        });

        let isValid = strategy.isValid(payload);

        if(!isValid) res.status(400).end();
        else next();
    }
};

module.exports = payloadValidator;