process.env.NODE_ENV = 'test';
process.env.PORT = 8001;
process.env.SALT = 'development';
process.env.DB_HOST = 'lenddo-test.mysql.database.azure.com';
process.env.DB_USER = 'lenddo@lenddo-test';
process.env.DB_PASSWORD = 'Lendo123';
process.env.DB_NAME = 'lenddo';

const server = require('../app.js');
const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();

chai.use(chaiHttp);

describe('#GET /lenddo/status', () => {

    it('should GET the API status', function (done) {
        chai.request(server)
            .get('/lenddo/status')
            .end((err, res) => {
                should.not.exist(err);

                res.should.have.status(200);
                res.text.should.be.eql('Lenddo API locked and loaded');

                done();
            });
    });
});


describe('#POST /lenddo', () => {
    //var sandbox;
    // beforeEach(function () {
    //     this.sandbox = sinon.sandbox.create()
    // });
    //
    // afterEach(function () {
    //     this.sandbox.restore()
    // });

    it('should queue lenddo score result', function (done) {
        this.timeout(5 * 1000);
        let payload = {
            client_id:"45784684-78979877979",
            event:"scoring_complete",
            result:{
                score:'500'
            }
        };

        chai.request(server)
            .post('/lenddo')
            .set('Content-Type','application/x-www-form-urlencoded')
            .send(payload)
            .end((err, res) => {
                should.not.exist(err);

                res.should.have.status(200);
                res.text.should.be.eql('true');

                done();
            });

    });

    it('should return same sent object for lenddo verification result', function (done) {
        this.timeout(5 * 1000);
        let payload = {
            client_id:"12345678-78979877979",
            event:"verification_complete",
            result:{
                whatever:"whatever"
            }
        };

        let response = {
            verificationData : payload
        };

        chai.request(server)
            .post('/lenddo')
            .set('Content-Type','application/x-www-form-urlencoded')
            .send(payload)
            .end((err, res) => {
                should.not.exist(err);

                res.should.have.status(200);
                res.body.should.be.eql(response);

                done();
            });
    });

    it('should return same sent object for lenddo decision result', function (done) {
        this.timeout(5 * 1000);
        let payload = {
            client_id:"12345678-78979877979",
            event:"application_decision_complete",
            result:{
                whatever:"whatever"
            }
        };

        let response = {
            decisionData : payload
        };

        chai.request(server)
            .post('/lenddo')
            .set('Content-Type','application/x-www-form-urlencoded')
            .send(payload)
            .end((err, res) => {
                should.not.exist(err);

                res.should.have.status(200);
                res.body.should.be.eql(response);

                done();
            });
    });

    it('should return same sent object for lenddo feature result', function (done) {
        this.timeout(5 * 1000);
        let payload = {
            client_id:"12345678-78979877979",
            event:"application_features_complete",
            result:{
                whatever:"whatever"
            }
        };

        let response = {
            featuresData : payload
        };

        chai.request(server)
            .post('/lenddo')
            .set('Content-Type','application/x-www-form-urlencoded')
            .send(payload)
            .end((err, res) => {
                should.not.exist(err);

                res.should.have.status(200);
                res.body.should.be.eql(response);

                done();
            });
    });

    it('should return same sent object for lenddo multiple verification result', function (done) {
        this.timeout(5 * 1000);
        let payload = {
            client_id:"12345678-78979877979",
            event:"application_multiple_verification_complete",
            result:{
                whatever:"whatever"
            }
        };

        let response = {
            multipleVerificationData : payload
        };

        chai.request(server)
            .post('/lenddo')
            .set('Content-Type','application/x-www-form-urlencoded')
            .send(payload)
            .end((err, res) => {
                should.not.exist(err);

                res.should.have.status(200);
                res.body.should.be.eql(response);

                done();
            });
    });



});