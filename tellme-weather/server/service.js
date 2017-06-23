'use strict';

// api keys
const config = require('../config');
const weatherToken = config.weatherToken;

const express = require('express');
const service = express();
const request = require('superagent');

module.exports = (config) => {
    const log = config.log();

    service.get('/service/:location', (req, res) => {

        if(req.get('X-TELLME-SERVICE-TOKEN') !== config.serviceAccessToken) {
            return res.sendStatus(403);
        }

        request.get('http://api.openweathermap.org/data/2.5/weather?q=' +
        req.params.location + '&APPID='+ weatherToken +'&units=metric',
        (err, response) => {
            if(err) {
                log.error(err);
                return res.sendStatus(500);
            }
            res.json({result: `${response.body.weather[0].description} at ${response.body.main.temp} degrees`});
        });
    });
    return service;
};
