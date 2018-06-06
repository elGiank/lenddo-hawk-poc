const LenddoQueue = require('../../models/lenddoQueue');
const crypto = require('crypto');


const scoreHandler = {
    isApplicable: (event) => {
        return event === 'scoring_complete';
    },
    queue: (scoreData) => {
        let encryptedDni = getEncryptedDni(getCustomerDni(scoreData.client_id));
        let score = scoreData.result.score;

        return new LenddoQueue(encryptedDni, score).save();
    }
};

const getCustomerDni = (clientId) => {
    // assumed clientId Formatt: 12345678-78979877979
    return clientId.substr(0, 8);

};

const getEncryptedDni = (dni) => {
    let sum = crypto.createHash('sha256');
    let salt = process.env.SALT || 'development';

    sum.update(salt);
    sum.update(dni);

    return sum.digest('hex');
};

module.exports = scoreHandler;