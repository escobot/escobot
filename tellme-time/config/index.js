require('dotenv').config();
const bunyan = require("bunyan");

const log = {
    development: () => {
        return bunyan.createLogger({name: 'tellme-time-development', level: 'debug'});
    },
    production: () => {
        return bunyan.createLogger({name: 'tellme-time-production', level:'info'});
    },
    test: () => {
        return bunyan.createLogger({name: 'tellme-time-test', level: 'fatal'});
    }
};

module.exports = {
    geoToken: process.env.GEO_TOKEN,
    timeToken: process.env.TIME_TOKEN,
    log: (env) => {
        if(env) return log[env]();
        return log[process.env.NODE_ENV || 'development']();
    }
};