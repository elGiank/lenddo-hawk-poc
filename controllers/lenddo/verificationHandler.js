const verificationHandler = {
    isApplicable: (event) => {
        return event === 'verification_complete';
    },
    queue: (verificationData) => {
        return { verificationData: verificationData } ;
    }
};

module.exports = verificationHandler;