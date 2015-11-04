'use strict';

const assert = require("assert");
const HexConnector = require('node-hexconnector');
const connector = new HexConnector();

const loggerMock = {
    setHandler: (fn) => {
        this.handler = fn;
    },

    log: (type, message) => {
        this.handler({type, message});
    }
};

connector.registerAdapter('errorHandler', __dirname + '/../');
connector.registerAdapter('logger', loggerMock);

describe('Error Handler module', () => {

  describe('getHandler', () => {

    it('should return with a handler function and call custom function', () => {
        connector.adapters.logger.setHandler((data) => {
            assert.deepEqual(data, { type: 'error', message: 'ERROR: asd' });
        });

        const handler = connector.adapters.errorHandler.getHandler((error) => {
            assert.deepEqual('asd', error);
        });

        handler('asd');
    });
  });
});