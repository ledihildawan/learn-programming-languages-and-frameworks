import Elysia from 'elysia';
import { ElysiaWS } from 'elysia/ws';

class WsClient {
  public list: Set<ElysiaWS> = new Set();

  add(ws: ElysiaWS) {
    this.list.add(ws);
  }

  get(ws: ElysiaWS) {
    return Array.from(this.list).find((item) => item.id === ws.id);
  }

  remove(ws: ElysiaWS) {
    this.list.delete(ws);
  }
}

export const store = new Elysia().decorate('wsClient', new WsClient());
