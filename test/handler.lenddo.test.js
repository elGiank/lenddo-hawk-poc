process.env.NODE_ENV = 'test';
process.env.PORT = 8001;
process.env.SALT = 'test';

const should = require('chai').should();
const crypto = require('crypto');
const sinon = require('sinon');
const mockMysql = sinon.mock(require('mysql'));

const {scoreHandler, _getCustomerDni, _getEncryptedDni } = require('../controllers/lenddo/scoreHandler');

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
    //
    // it('should queue a new socre result', function (done) {
    //     this.timeout(5 * 1000);
    //     mockMysql.expects('createConnection').returns({
    //         query: (query, vars, callback) => {
    //             callback(null, {affectedRows: 1});
    //         }
    //     });
    //
    //     let scoreData = {
    //         "client_id":"your_APPLICATION_ID_123",
    //         "event":"scoring_complete",
    //         "result":{
    //             "score":"687"
    //         }
    //     };
    //
    //     scoreHandler.queue(scoreData).then((success) => {
    //         success.should.be.eql(true);
    //         done();
    //     });
    //
    //     mockMysql.restore();
    //
    // });

});