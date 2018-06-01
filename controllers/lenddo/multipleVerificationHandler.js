const multipleVerificationHandler = {
    isApplicable: (event) => {
        return event === 'application_multiple_verification_complete';
    },
    queue: (multipleVerificationData) => {
        return { multipleVerificationData: multipleVerificationData };
    }
};

module.exports = multipleVerificationHandler;