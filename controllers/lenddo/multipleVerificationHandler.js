const multipleVerificationHandler = {
    isApplicable: (event) => {
        return event === 'application_multiple_verification_complete';
    },
    queue: (multipleVerificationData) => {
        return new Promise((resolve) => {
            resolve({multipleVerificationData: multipleVerificationData});
        });
    }
};

module.exports = multipleVerificationHandler;