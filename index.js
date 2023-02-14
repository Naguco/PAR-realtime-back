const { WebSocketServer } = require('ws');
const { onMessageHandler } = require('./components/MessageHandler');

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log('received: %s', data);
    onMessageHandler(data, ws);
  });

  ws.send('connected');
});