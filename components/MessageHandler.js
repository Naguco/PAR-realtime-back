const { Counter } = require("./Counter");
const { notifyUser } = require("./Notifier");
const { unexpectedErrorText, errorText } = require("./ObjectNotifications");
let counter = new Counter(10);

let onMessageHandler = (data, ws) => {

    let stringedData = data.toString();
    let dataObject = new Object(JSON.parse(stringedData));

    let event = dataObject.event;

    if (!event) {
        notifyUser(ws, unexpectedErrorText('No event defined'));
        return;
    }

    if (event === 'join-lobby') {
        notifyUser(ws, errorText('Undefined event'));
    } else if (event === 'create-lobby') {
        notifyUser(ws, errorText('Undefined event'));
    } else if (event === 'end-lobby') {
        notifyUser(ws, errorText('Undefined event'));
    } else if (event === 'post-message') {
        notifyUser(ws, errorText('Undefined event'));
    } else if (event === 'delete-message') {
        notifyUser(ws, errorText('Undefined event'));
    } else if (event === 'start-counter') {
        counter.setNewUser(ws);
        counter.startCounter();
    } else if (event === 'stop-counter') {
        counter.stopCounter();
    } else if (event === 'continue-counter') {
        counter.continueCounter();
    } else {
        notifyUser(ws, errorText('Undefined event'));
    }

};

module.exports = {
    onMessageHandler
};