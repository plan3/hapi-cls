# Continuation Local Storage for Hapi [![Build Status](https://travis-ci.org/plan3/hapi-cls.svg?branch=master)](https://travis-ci.org/plan3/hapi-cls)

Heavily "inspired" on https://github.com/entrinsik-org/hapi-cls

Ref: https://www.npmjs.com/package/continuation-local-storage

This Hapi plugin installs CLS and binds it to the request

## Installation

`npm install @smp-relate/hapi-cls`

## Usage

```javascript
const server = new hapi.Server();
server.connection({port: config.port});

server.register(require('@smp-relate/hapi-cls'), {namespace: 'my-namespace'})
```

**NOTE:** Registration should be done in the "highest" point possible to ensure other plugins are also working
in the CLS context.

### Value setting

There's a hook enabling setting custom values in the request context right after it's initialized.
Requires value resolution function that receives request object as an argument. Example:

```javascript
const server = new hapi.Server();
server.connection({port: config.port});

server.register(require('@smp-relate/hapi-cls'), {namespace: 'my-namespace', set: {
    customValue: (request) => request.headers['x-custom-header']
}});
```

## License

ISC
