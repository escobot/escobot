'use strict';

// api keys
const config = require('../config');
const slackToken = config.slackToken;
const witToken = config.witToken;

// clients
const slackClient = require('../server/slackClient');
const witClient = require('../server/witClient')(witToken);

// logs
const slackLogLevel = 'verbose';

// server
const service = require('../server/service');
const http = require('http');
const server = http.createServer(service);

const serviceRegistry = service.get('serviceRegistry');

// real time messages
const rtm = slackClient.init(slackToken, slackLogLevel, witClient, serviceRegistry);
rtm.start();

slackClient.addAuthenticatedHandler(rtm, () => server.listen(3000));

server.on('listening', function () {
    console.log(`IRIS is listening on ${server.address().port} in ${service.get('env')} mode.`);
})