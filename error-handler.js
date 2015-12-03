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

    getHandler: (fn) => {
        return (error) => {

            if (error instanceof Error) {
                getLogger().log('error', 'ERROR: ' + error, error.stack);
            }

            if (typeof fn === 'function') {
                fn(error);
            }
        };
    }
};