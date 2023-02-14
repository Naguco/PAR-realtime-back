const { WebSocketServer } = require('ws'); 
const { Counter } = require('./components/Counter');

const wss = new WebSocketServer({ port: 8080 });
let counter = new Counter(10);

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data) {

    let stringedData = data.toString();

    if (stringedData === 'start') {
        counter.setNewUser(ws);
        counter.startCounter();
    }

    if (stringedData === 'continue') {
        counter.continueCounter();
    }

    if (stringedData === 'stop') {
        counter.stopCounter();
    }

    console.log('received: %s', data);

  });

  ws.send('connected');
});