'use strict';

const RtmClient = require('@slack/client').RtmClient;
const CLIENTS_EVENTS = require('@slack/client').CLIENT_EVENTS;
const RTM_EVENTS = require('@slack/client').RTM_EVENTS;

let rtm = null;

function handleOnAuthenticated(rtmStartData) {
    console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name} but not yet connected to a channel`);
}

function handleOnMessage(message) {
    console.log(message)

    rtm.sendMessage('this is a text message', message.channel, function messageSent() {

    });
}

function addAuthenticatedHandler(rtm, handler) {
    rtm.on(CLIENTS_EVENTS.RTM.AUTHENTICATED, handler);
}

module.exports.init = function slackClient(token, logLevel) {
    rtm = new RtmClient(token, {logLevel: logLevel});
    addAuthenticatedHandler(rtm, handleOnAuthenticated);
    rtm.on(RTM_EVENTS.MESSAGE, handleOnMessage);
    return rtm;
}

module.exports.addAuthenticatedHandler = addAuthenticatedHandler;


