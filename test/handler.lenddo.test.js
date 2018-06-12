process.env.NODE_ENV = 'test';
process.env.PORT = 8001;
process.env.SALT = 'test';

const should = require('chai').should();
const crypto = require('crypto');
const sinon = require('sinon');

const {ScoreHandler, _getCustomerDni, _getEncryptedDni } = require('../controllers/lenddo/scoreHandler');

describe('Score Result Handler', () => {
    it('should return the DNI from the applicationId', function (done) {
        let applicationId = '45785694-78979877979';
        let dni = _getCustomerDni(applicationId);

        dni.should.be.a('string');
        dni.should.have.lengthOf(8);
        dni.should.be.eql('45785694');

        done();
    });

    it('should encrypt a dni with a salt', function (done) {
        let dni = '45785694';
        let sum = crypto.createHash('sha256');
        let salt = process.env.SALT;
        let encryptedDni = _getEncryptedDni(dni);

        sum.update(salt);
        sum.update(dni);

        encryptedDni.should.be.a('string');
        encryptedDni.should.have.lengthOf(64);
        encryptedDni.should.be.eql(sum.digest('hex'));

        done();
    });

    it('should queue a new score result', function (done) {

        let fakeLenddoQueueRepository = {
            save: function (lenddoQueue) {
                return new Promise((resolve) => {
                    resolve(true)
                });
            }
        };

        let scoreData = {
            "client_id": "12345678-78979877979",
            "event": "scoring_complete",
            "result": {
                "score": "444"
            }
        };

        let scoreHandler = new ScoreHandler(fakeLenddoQueueRepository);
        let saveSpy = sinon.spy(fakeLenddoQueueRepository, 'save');
        let queueSpy = sinon.spy(scoreHandler, 'queue');


        scoreHandler
            .queue(scoreData)
            .then((success) => {

                sinon.assert.calledOnce(saveSpy);
                sinon.assert.calledOnce(queueSpy);
                success.should.be.eql(true);

                done();
            });


    });

});