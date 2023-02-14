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

let errorText = (value) => {
    return new Object({
        event: 'error-text',
        info: {
            text: value
        }
    });
};

let unexpectedErrorText = (value) => {
    return new Object({
        event: 'unexpected-error-text',
        info: {
            text: value
        }
    });
};

module.exports = {
    timerUpdate,
    warningText,
    errorText,
    unexpectedErrorText
};