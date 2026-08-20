const http = require('http');
const fs = require('fs');
const path = require('path');
const WebSocket = require('ws');

const PORT = process.env.PORT || 8080;

// --- Simple static file server for the frontend ---
const server = http.createServer((req, res) => {
  let filePath = req.url === '/' ? '/index.html' : req.url;
  filePath = path.join(__dirname, 'public', filePath);

  const ext = path.extname(filePath);
  const contentTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
  };

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentTypes[ext] || 'text/plain' });
    res.end(content);
  });
});

// --- WebSocket server attached to the same HTTP server ---
const wss = new WebSocket.Server({ server });

wss.on('connection', (socket) => {
  console.log('Client connected. Total clients:', wss.clients.size);

  socket.on('message', (message) => {
    const text = message.toString();

    // broadcast to every connected client
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(text);
      }
    });
  });

  socket.on('close', () => {
    console.log('Client disconnected. Total clients:', wss.clients.size);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
