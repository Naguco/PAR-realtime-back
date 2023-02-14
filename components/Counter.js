class Counter {
  constructor(limit) {
    this.limit = limit;
    this.lastLimit = 0;
    this.counter = null;
    this.users = [];
  }

  setNewUser(ws) {
    this.users = this.users.concat(ws);
  }

  deleteUser(ws) {
    const index = this.users.indexOf(ws);
    if (index > -1) {
      this.users.splice(index, 1);
    }
  }

  async startCounter() {
    if (this.counter) {
        console.log("Counter exists");
        for (let i = 0; i < this.users.length; i++) {
            await this.users[i].send('A counter is already running');
        }
    } else {
        this.lastLimit = this.limit;
        this.counter = setInterval(async () => {
            if (this.lastLimit <= 0) {
                for (let i = 0; i < this.users.length; i++) {
                    this.users[i].send("The counter has ended");
                }
                clearInterval(this.counter);
                this.counter = null;
                return;
            }
            for (let i = 0; i < this.users.length; i++) {
                await this.users[i].send(String(this.lastLimit));
            }
            this.lastLimit = this.lastLimit - 1;
        }, 1000);
    }
  }

  continueCounter() {
    this.counter = setInterval(async () => {
        if (this.lastLimit <= 0) {
            for (let i = 0; i < this.users.length; i++) {
                await this.users[i].send("The counter has ended");
            }
            clearInterval(this.counter);
            return;
        }
        for (let i = 0; i < this.users.length; i++) {
            await this.users[i].send(String(this.lastLimit));
        }
        this.lastLimit = this.lastLimit - 1;
    }, 1000);
  }

  stopCounter() {
    clearInterval(this.counter);
    this.counter = null;
  }

}

module.exports = {
  Counter,
};
