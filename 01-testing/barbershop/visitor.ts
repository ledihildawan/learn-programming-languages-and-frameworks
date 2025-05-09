import Elysia from 'elysia';

export const visitor = new Elysia({ prefix: '/visitor' })
  .state({
    visitor: {
      clients: [] as ElysiaWS[],
      count: 0,
    },
  })
  .ws('/', {
    open: (ws) => {
      visitor.store.visitor.count += 1;

      visitor.store.visitor.clients.push(ws);

      visitor.store.visitor.clients.forEach((client) => {
        client.send(JSON.stringify({ visitorCount: visitor.store.visitor.count }));
      });
    },
    close: (ws) => {
      visitor.store.visitor.count -= 1;

      visitor.store.visitor.clients = visitor.store.visitor.clients.filter((client) => client !== ws);

      visitor.store.visitor.clients.forEach((client) => {
        client.send(JSON.stringify({ visitorCount: visitor.store.visitor.count }));
      });
    },
  });
