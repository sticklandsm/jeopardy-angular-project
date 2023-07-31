import express = require('express');
import * as http from 'http';
import WebSocket from 'ws';
import { getAllQuestions, getRandomJeopardyRound } from './helpers';

const app = express();

//initialize a simple http server
const server = http.createServer(app);

app.get('/', (req, res) => {
  res.json(getRandomJeopardyRound('DJ!'));
});

const PORT = process.env['PORT'] || 8999;

const wsServer = new WebSocket.Server({ server });

wsServer.on('connection', (socket) => {
  socket.send('Welcome to the internet');
  console.log('Connection in back end');
  socket.on('message', (data) => {
    socket.send('message received: ' + data);
    broadcast(data, socket);
  });
});

function broadcast(data: Object, socketToOmit: WebSocket) {
  wsServer.clients.forEach((connectedClient) => {
    if (
      connectedClient.readyState === WebSocket.OPEN &&
      connectedClient !== socketToOmit
    ) {
      connectedClient.send(JSON.stringify(data));
    }
  });
}
//start our server
server.listen(PORT, () => {
  console.log(`Server started on port ${PORT} :)`);
});
