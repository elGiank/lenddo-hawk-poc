const router = require('express').Router();
const ScoreHandler = require('./scoreHandler');
const VerificationHandler = require('./verificationHandler');
const DecisionHandler = require('./decisionHandler');
const FeaturesHandler = require('./featuresHandler');
const MultipleVerificationHandler = require('./multipleVerificationHandler');

router
    .get('/status', (req, res) => {
        res.send("Lenddo API locked and loaded");
    })
    .post('/', (req, res) => {
        let data = req.body;
        switch (data.event){
            case 'scoring_complete':
                ScoreHandler(data, res);
                break;
            case 'verification_complete':
                VerificationHandler(data, res);
                break;
            case 'application_decision_complete':
                DecisionHandler(data, res);
                break;
            case 'application_features_complete':
                FeaturesHandler(data, res);
                break;
            case 'application_multiple_verification_complete':
                MultipleVerificationHandler(data, res);
                break;
            default:
                res.status(400).send();
        }
    });

module.exports = router;


