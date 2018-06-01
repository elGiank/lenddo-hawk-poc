const router = require('express').Router();
const ScoreHandler = require('./scoreHandler');

router
    .get('/status', (req, res) => {
        res.send("Lenddo API locked and loaded");
    })
    .post('/', (req, res) => {
        // let scoreData = req.body;
        // console.log(scoreData);
        ScoreHandler(req, res);
    });

module.exports = router;