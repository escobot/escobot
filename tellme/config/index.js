require('dotenv').config();
const bunyan = require("bunyan");

const log = {
    development: () => {
        return bunyan.createLogger({name: 'tellme-development', level: 'debug'});
    },
    production: () => {
        return bunyan.createLogger({name: 'tellme-production', level:'info'});
    },
    test: () => {
        return bunyan.createLogger({name: 'tellme-test', level: 'fatal'});
    }
};

module.exports = {
    slackToken: process.env.SLACK_TOKEN,
    witToken: process.env.WIT_TOKEN,
    slackLogLevel: 'verbose',
    serviceTimeout: 30,
    log: (env) => {
        if(env) return log[env]();
        return log[process.env.NODE_ENV || 'development']();
    }
};