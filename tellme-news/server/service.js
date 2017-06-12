'use strict';

const express = require('express');
const service = express();
const request = require('superagent');

const config = require('../config');

service.get('/service', (req, res, next) => {
    
    request.get('https://newsapi.org/v1/articles?source=the-next-web&sortBy=latest&apiKey='+ config.newsToken,
    (err, response) => {

        if (err) {
            console.log(err);
            return res.sendStatus(404);
        }

        res.json({result: response.body.articles});

    });
});

module.exports = service;