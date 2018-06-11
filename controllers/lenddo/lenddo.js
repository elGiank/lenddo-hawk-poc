const router = require('express').Router();
const isProductionMode = require('../../lib/isProductionMode');
const Queuer = require('../../lib/strategys/queuer');
const ScoreHandler = require('./scoreHandler').scoreHandler;
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
        let strategies = [
            new Queuer(ScoreHandler),
            new Queuer(VerificationHandler),
            new Queuer(DecisionHandler),
            new Queuer(FeaturesHandler),
            new Queuer(MultipleVerificationHandler)
        ];

        let strategy = strategies.find((strategy) => {
            return strategy.isApplicable(data.event);
        });

        strategy.queue(data)
            .then((success) => {
                res.status(success ? 200 : 400).send(isProductionMode ? undefined : success);
            })
            .catch((err) => {
                res.status(400).send(isProductionMode ? undefined : err);
            });
    });

module.exports = router;


