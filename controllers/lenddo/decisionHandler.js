class DecisionHandler {
    isApplicable (event) {
        return event === 'application_decision_complete';
    }
    queue (decisionData) {
        return new Promise((resolve) => {
            resolve({decisionData: decisionData});
        });
    }
}

module.exports = DecisionHandler;