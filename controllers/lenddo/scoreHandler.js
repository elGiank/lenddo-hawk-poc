const LenddoQueue = require('../../models/lenddoQueue');

const scoreHandler = { //make this a class who extends queuer which should be a class to
    isApplicable: (event) => {
        return event === 'scoring_complete';
    },
    queue: (scoreData) => {
        return new LenddoQueue(scoreData.client_id, scoreData.result.score).save();
    }
};

module.exports = scoreHandler;