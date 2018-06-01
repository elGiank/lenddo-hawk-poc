const scoreHandler = {
    isApplicable: (event) => {
        return event === 'scoring_complete';
    },
    queue: (scoreData) => {
        return { scoreData: scoreData };
    }
};

module.exports = scoreHandler;