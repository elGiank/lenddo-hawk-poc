class FeaturesHandler {
    isApplicable (event) {
        return event === 'application_features_complete';
    }
    queue (featuresData) {
        return new Promise((resolve) => {
            resolve({featuresData: featuresData});
        });
    }
}

module.exports = FeaturesHandler;