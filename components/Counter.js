const { notifyUsers } = require("./Notifier");
const { warningText, timerUpdate } = require("./ObjectNotifications");

class Counter {
  constructor(limit) {
    this.limit = limit;
    this.lastLimit = 0;
    this.counter = null;
    this.users = [];
  }

  setNewUser(ws) {
    const index = this.users.indexOf(ws);
    if (index == -1) {
        this.users = this.users.concat(ws);
    }
  }

  deleteUser(ws) {
    const index = this.users.indexOf(ws);
    if (index > -1) {
      this.users.splice(index, 1);
    }
  }

  async startCounter() {
    if (this.counter) {
        await notifyUsers(this.users, warningText('A counter is already existing'));
    } else {
        this.lastLimit = this.limit;
        await notifyUsers(this.users, warningText('The counter has started'));
        this.counter = setInterval(async () => {
            if (this.lastLimit < 0) {
                await notifyUsers(this.users, warningText('The counter has ended'));
                clearInterval(this.counter);
                this.counter = null;
                return;
            }
            await notifyUsers(this.users, timerUpdate(this.lastLimit));
            this.lastLimit = this.lastLimit - 1;
        }, 1000);
    }
  }

  async continueCounter() {
    if (this.lastLimit == 0) {
        await notifyUsers(this.users, warningText('The counter is not running'));
    } else {
        await notifyUsers(this.users, warningText('The counter has restarted'));
        this.counter = setInterval(async () => {
            if (this.lastLimit < 0) {
                await notifyUsers(this.users, warningText('The counter has ended'));
                clearInterval(this.counter);
                this.counter = null;
                return;
            }
            await notifyUsers(this.users, timerUpdate(this.lastLimit));
            this.lastLimit = this.lastLimit - 1;
        }, 1000);
    }
  }

  stopCounter() {
    clearInterval(this.counter);
    this.counter = null;
  }

}

module.exports = {
  Counter,
};
