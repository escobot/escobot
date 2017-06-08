'use strict';

const service = require('../server/service');
const http = require(http);

const server = http.createServer(service);
server.listen(3000);