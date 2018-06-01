const router = require('express').Router();
const Queuer = require('../../lib/queuer');
const ScoreHandler = require('./scoreHandler');
const VerificationHandler = require('./verificationHandler');
const DecisionHandler = require('./decisionHandler');
const FeaturesHandler = require('./featuresHandler');
const MultipleVerificationHandler = require('./multipleVerificationHandler');
const UnknowRequestHandler = require('./unknowRequestHandler');

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
            new Queuer(MultipleVerificationHandler),
            new Queuer(UnknowRequestHandler) //this should be the last strategy, to validate unknow sources
        ];

        let strategy = strategies.find((strategy) => {
            return strategy.isApplicable(data.event);
        });

        let queueResult = strategy.queue(data); //queue podria hacerse una funcion async si es necesario :D
        res.status(queueResult ? 200 : 400).send(queueResult);

    });

module.exports = router;


