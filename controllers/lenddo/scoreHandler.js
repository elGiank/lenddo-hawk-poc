const LenddoQueueRepository = require('../../models/lenddoQueue').LenddoQueueRepository;
const LenddoQueue =  require('../../models/lenddoQueue').LenddoQueue;
const crypto = require('crypto');


class ScoreHandler {
    constructor(repository) {
        this.repository = repository || new LenddoQueueRepository();
    }

    isApplicable (event) {
        return event === 'scoring_complete';
    }
    queue (scoreData) {
        let encryptedDni = getEncryptedDni(getCustomerDni(scoreData.client_id));
        let score = scoreData.result.score;
        let scoreResult = new LenddoQueue(encryptedDni, score);

        return this.repository.save(scoreResult);
    }
}

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

module.exports = {ScoreHandler, _getCustomerDni: getCustomerDni, _getEncryptedDni: getEncryptedDni};