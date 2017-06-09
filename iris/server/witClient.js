'use strict';

const request = require('superagent');
const config = require('../config');

function handleWitResponse(res) {
    return res.entities;
}

module.exports = function witClient(token) {
    const ask = function ask(message, cb) {

        request.get('https://api.wit.ai/message')
            .set('Authorization', 'Bearer ' + config.witToken)
            .query({v: '20170607'})
            .query({q: message})
            .end((err, res) => {
                if (err) return cb(err);
                if(res.statusCode != 200) return cb('Expected status 200 but got ' + res.statusCode);

                const witResponse = handleWitResponse(res.body);
                return cb(null, witResponse);
            })

    }

    return {
        ask: ask
    }
}