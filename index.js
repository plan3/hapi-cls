'use strict';

const cls = require('continuation-local-storage');

exports.register = function(server, options, next) {
    if (!options.namespace) {
        return next(new TypeError('CLS Namespace name is required'));
    }

    const ns = cls.getNamespace(options.namespace) || cls.createNamespace(options.namespace);
    server.log(['hapi-cls', 'info'], 'Created CLS namespace: ' + options.namespace);
    server.expose('cls', cls);
    const set = options.set || {};

    server.ext('onRequest', function(request, reply) {
        ns.bindEmitter(request.raw.req);
        ns.bindEmitter(request.raw.res);

        ns.run(function() {
            Object.keys(set).forEach(varName => ns.set(varName, set[varName](request)));
            reply.continue();
        });
    });
    return next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};
