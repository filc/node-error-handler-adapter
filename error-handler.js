var connector;
var logger;

function getLogger() {
    if (!logger) {
        logger = connector.adapters.logger;
    }

    return logger;
}

module.exports = {
    initAdapter: (_connector, _config) => {
        connector = _connector;
    },

    getHandler: (fn, additionalHandlers) => {
        return (error) => {

            if (additionalHandlers) {
                for (const key in additionalHandlers) {
                    if (error instanceof additionalHandlers[key]['class']) {
                        return additionalHandlers[key]['handler'](error);
                    }
                }
            }

            if (error instanceof Error) {
                getLogger().log('error', 'ERROR: ' + error, error.stack);
            }

            if (typeof fn === 'function') {
                fn(error);
            }
        };
    }
};