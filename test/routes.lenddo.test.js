process.env.NODE_ENV = 'test';
process.env.PORT = 8000;
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
        this.timeout(10000);
        let result = {
            client_id:"45784684-78979877979",
            event:"scoring_complete",
            result:{
                score:'500'
            }
        };

        chai.request(server)
            .post('/lenddo')
            .set('Content-Type','application/x-www-form-urlencoded')
            .send(result)
            .end((err, res) => {
                should.not.exist(err);

                res.should.have.status(200);

                console.log('score handler body', res.body);
                console.log('score handler text', res.text);

                done();
            });

    });

    // it('should do nothing on lenddo verification result', (done) => {
    //     done();
    // });
    //
    // it('should do nothing on lenddo decision result', (done) => {
    //     done();
    // });
    //
    // it('should do nothing on lenddo feature result', (done) => {
    //     done();
    // });
    //
    // it('should do nothing on lenddo multiple verification result', (done) => {
    //     done();
    // });



});