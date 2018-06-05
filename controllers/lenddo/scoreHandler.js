const LenddoQueue = require('../../models/lenddoQueue');
const crypto = require('crypto');


const scoreHandler = {
    isApplicable: (event) => {
        return event === 'scoring_complete';
    },
    queue: (scoreData) => {
        let encryptedDni = getEncryptedDni(scoreData.client_id);
        let score = scoreData.result.score;

        return new LenddoQueue(encryptedDni, score).save();
    }
};

const getEncryptedDni = (dni) => {
    let sum = crypto.createHash('sha256');
    //sum.update(salt); -> TODO: when salt is avaible via arkconfig, read it here.
    sum.update(dni);
    return sum.digest('hex');
};

module.exports = scoreHandler;