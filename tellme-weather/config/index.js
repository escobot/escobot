require('dotenv').config();
const bunyan = require('bunyan');
const serviceAccessToken = require('crypto').randomBytes(16).toString('hex').slice(0, 32);

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
    weatherToken: process.env.WEATHER_TOKEN,
    tellmeApiToken: process.env.TELLME_API_TOKEN,
    serviceAccessToken: serviceAccessToken,
    log: (env) => {
        if(env) return log[env]();
        return log[process.env.NODE_ENV || 'development']();
    }
};