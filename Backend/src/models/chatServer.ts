import { WebSocketServer, WebSocket } from 'ws';
import { IncomingMessage } from 'http';

const wss = new WebSocketServer({ port: 3001 });

let messages: string[] = [];

wss.on('connection', (ws: WebSocket, req: IncomingMessage) => {
  console.log('Client connected');

  // Send existing chat history to the new client
  messages.forEach((msg) => ws.send(msg));

  ws.on('message', (data: string) => {
    const message = data.toString();
    messages.push(message);

    // Broadcast to all clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log("WebSocket server running on ws://localhost:3001");
