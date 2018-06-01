const decisionHandler =  {
    isApplicable: (event) => {
        return event === 'application_decision_complete';
    },
    queue: (decisionData) => {
        return { decisionData: decisionData };
    }
};

module.exports = decisionHandler;