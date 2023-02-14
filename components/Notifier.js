let notifyUsers = async (users, notificationObject) => {
    for (let i = 0; i < users.length; i++) {
        await users[i].send(JSON.stringify(notificationObject));
    }
};

module.exports = {
    notifyUsers
};