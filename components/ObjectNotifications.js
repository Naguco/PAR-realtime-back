let timerUpdate = (value) => {
    return new Object({
        event: 'timer-update',
        info: {
            value: value
        }
    });
};

let warningText = (value) => {
    return new Object({
        event: 'warning-text',
        info: {
            text: value
        }
    });
};

module.exports = {
    timerUpdate,
    warningText
};