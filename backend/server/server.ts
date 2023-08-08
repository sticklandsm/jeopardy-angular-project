import express = require('express');
import request from 'superagent';
import * as http from 'http';
import WebSocket from 'ws';
import { getFullJeopardyGame, generateRandom } from './helpers';
import fallbackJeopardyData from '../data/questions.json';
import fallbackFinalJeopardyData from '../data/finalJeopardy.json';

const app = express();

//initialize a simple http server
const server = http.createServer(app);

app.get('/', async (req, res) => {
  const randomNum = generateRandom(360000);

  try {
    const clueBaseResponse = await request.get(
      `cluebase.lukelav.in/clues?limit=1000&order_by=id&offset=${randomNum}`
      // `cluebase.lukelav.in/clues?limit=1000&order_by=category&sort=asc&offset=${randomNum}`
    );
    const jserviceResponse = await request.get(
      `http://jservice.io//api/final?count=20`
    );
    res.json(getFullJeopardyGame(clueBaseResponse.body, jserviceResponse.body));
  } catch (error) {
    console.error(error);
    res.json(
      getFullJeopardyGame(fallbackJeopardyData, fallbackFinalJeopardyData)
    );
  }
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

//http://jservice.io//api/final?count=100
