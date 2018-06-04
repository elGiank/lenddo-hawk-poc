const router = require('express').Router();
const Queuer = require('../../lib/strategys/queuer');
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
                res.status(success ? 200 : 400).send(success);
            })
            .catch(() => {
                res.status(400).send('falloooooo');
            });
    });

module.exports = router;


