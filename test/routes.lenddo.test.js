process.env.NODE_ENV = 'test';
process.env.PORT = 8000;
process.env.SALT = 'development';
process.env.DB_HOST = 'lenddo-test.mysql.database.azure.com';
process.env.DB_USER = 'lenddo@lenddo-test';
process.env.DB_PASSWORD = 'Lendo123';
process.env.DB_NAME = 'lenddo';

const chai = require('chai');
const request = require('supertest');
const should = chai.should();
// const chaiHttp = require('chai-http');
// chai.use(chaiHttp);

require = require('really-need');


describe('Lenddo API integration tests', () => {
    var server;
    beforeEach(() => {
        server = require('../../app.js', { bustCache: true });
    });
    afterEach((done)  => {
        server.close(done);
    });

    it('#GET /lenddo/status ', (done) => {
        request(server)
            .get('/lenddo/staus')
            .expect(200, done);
    });
});