'use strict';

const request = require('superagent');

module.exports.process = function process(intentData, registry, log, cb) {

    if(intentData.intent[0].value !== 'news')
        return cb(new Error(`Expected news intent, got ${intentData.intent[0].value}`));

    const service = registry.get('news');
    if(!service) return cb(false, 'No service available');

    request.get(`http://${service.ip}:${service.port}/service`, (err, res) => {
        if(err || res.statusCode != 200 || !res.body.result) {
            log.error(err);
            return cb(false, 'I had a problem finding out the news');
        }

        const message = formatData(res.body.result);
        return cb(false, `Today's most popular tech news include; ${message.text}`);
    });
};

function formatData(arr) {
    let message = '';
    arr.forEach(function(news) {
        message += `\n${news.url} ${news.title} by ${news.author}`;
    });
    return {text: message};
}