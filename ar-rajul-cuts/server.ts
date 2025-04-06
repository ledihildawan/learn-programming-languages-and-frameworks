import Bun from 'bun';
import { createServer } from 'http';
import next from 'next';
import { parse } from 'url';

const port = parseInt(process.env.PORT || '13131', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url!, true);
    handle(req, res, parsedUrl);
  });

  // Integrate WebSocket with Bun
  Bun.serve({
    fetch(req, bunServer) {
      if (bunServer.upgrade(req)) return;
      return new Response('Upgrade failed', { status: 500 });
    },
    websocket: {
      open(ws) {
        console.log('WebSocket connection opened');
      },
      message(ws, message) {
        console.log('Message received:', message);
        ws.send(`Echo: ${message}`);
      },
      close(ws, code, reason) {
        console.log('WebSocket connection closed', code, reason);
      },
    },
  });

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
