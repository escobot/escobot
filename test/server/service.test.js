'use strict';

const should = require('should');
const request = require('supertest');
const config = require('../../config');
const service = require('../../server/service')(config);

describe('The express service', () => {
    describe('PUT /foo', () => {
        it('should return HTTP 404', (done) => {
            request(service)
                .put('/foo')
                .expect(404, done);
        });
    });
});

describe('PUT /service/:intent/:port', () => {
    it('should return HTTP 200 with valid result', (done) => {
        request(service)
            .put('/service/test/9999')
            .set('X-ESCOBOT-API-TOKEN', config.escobotApiToken)
            .set('X-ESCOBOT-SERVICE-TOKEN', 'HEYE')
            .expect(200)
            .end((err, res) => {
                if(err) return done(err);
                res.body.result.should.startWith('test at [::ffff:127.0.0.1]:9999');
                return done();
            });
    });

    it('should return HTTP 403 with no api token provided', (done) => {
        request(service)
            .put('/service/test/9999')
            .expect(403)
            .end(done);
    });

    it('should return HTTP 400 with no service token provided', (done) => {
        request(service)
            .put('/service/test/9999')
            .set('X-ESCOBOT-API-TOKEN', config.escobotApiToken)
            .expect(400)
            .end(done);
    });
});