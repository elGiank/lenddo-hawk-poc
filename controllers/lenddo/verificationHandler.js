class VerificationHandler {
    isApplicable (event) {
        return event === 'verification_complete';
    }
    queue (verificationData) {
        return new Promise((resolve) => {
            resolve({verificationData: verificationData});
        });
    }
}

module.exports = VerificationHandler;