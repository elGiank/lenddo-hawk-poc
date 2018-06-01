const featuresHandler = {
    isApplicable: (event) => {
        return event === 'application_features_complete';
    },
    queue: (featuresData) => {
        return {featuresData: featuresData};
    }
};

module.exports = featuresHandler;