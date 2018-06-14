const getCredentials = (id) => {
    const credentials = {
        key: process.env.HAWK_KEY || 'werxhqb98rpaxn39848xrunpaw3489ruxnpa98w4rxn',
        algorithm: process.env.HAWK_ALGORITHM || 'sha256'
    };
    return credentials;
};

module.exports = getCredentials ;