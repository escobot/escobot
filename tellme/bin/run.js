'use strict';

// api keys
const config = require('../config');

// clients
const SlackClient = require('../server/slackClient');
const WitClient = require('../server/witClient');
const witClient = new WitClient(config.witToken);

// server
const service = require('../server/service')(config);
const http = require('http');
const server = http.createServer(service);

const serviceRegistry = service.get('serviceRegistry');
const slackClient = new SlackClient(config.slackToken, config.slackLogLevel, witClient, serviceRegistry);

slackClient.start(() => {
    server.listen(3000);
});

server.on('listening', function () {
    console.log(`Tellme is listening on ${server.address().port} in ${service.get('env')} mode.`);
})