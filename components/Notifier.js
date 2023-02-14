let notifyUsers = async (users, notificationObject) => {
    for (let i = 0; i < users.length; i++) {
        await users[i].send(JSON.stringify(notificationObject));
    }
};

let notifyUser = async (ws, notificationObject) => {
    await ws.send(JSON.stringify(notificationObject));
};

module.exports = {
    notifyUsers,
    notifyUser
};