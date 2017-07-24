'use strict';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
chai.should();
const hapi = require('hapi');
const lib = require('./index');
const cls = require('continuation-local-storage');

describe('hapi-cls', function () {
    let server;

    beforeEach(function () {
        server = new hapi.Server();
        server.connection();
    });

    it('should throw an error if the namespace name isnt supplied', function () {
        server.register({ register: lib, options: {}}).should.be.rejected
    });

    it('should not require an appVar', function (done) {
        server.register({ register: lib, options: { namespace: 'namespace' }}, done);
    });

    describe('when the plugin has been registered', function () {
        beforeEach(function (done) {
            server.register({ register: lib, options: { namespace: 'foo', set: {requestId: (request) => 'dummy' }}}, done);
        });

        it('should exist', function () {
            lib.should.exist;
        });

        it('should register a namespace with hapi', function () {
            server.plugins.should.have.property('@smp-relate/hapi-cls');
        });

        it('should execute custom setters to the namespace', function (done) {
            server.route({
                path: '/foo',
                method: 'get',
                handler: function () {
                    cls.getNamespace('foo').get('requestId').should.equal('dummy');
                    done();
                }
            });

            server.inject('/foo');
        });
    });
});
