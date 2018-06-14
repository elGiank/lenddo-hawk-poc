const router = require('express').Router();
const isProductionEnv = require('../../lib/isProductionEnv');
const Queuer = require('../../lib/strategys/queuer');
const ScoreHandler = require('./scoreHandler').ScoreHandler;
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
            new Queuer(new ScoreHandler),
            new Queuer(new VerificationHandler),
            new Queuer(new DecisionHandler),
            new Queuer(new FeaturesHandler),
            new Queuer(new MultipleVerificationHandler)
        ];

        let strategy = strategies.find((strategy) => {
            return strategy.isApplicable(data.event);
        });

        strategy.queue(data)
            .then((success) => {
                res.status(success ? 200 : 400).send(isProductionEnv ? undefined : success);
            })
            .catch((err) => {
                res.status(400).send(isProductionEnv ? undefined : err);
            });
    });

module.exports = router;


