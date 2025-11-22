import { Elysia } from 'elysia';
import ipaddr from 'ipaddr.js';

export const ip = (app: Elysia) =>
  app.derive(({ server, request, headers }) => {
    const rawIp =
      headers['x-forwarded-for']?.split(',')[0].trim() || server?.requestIP(request)?.address || '127.0.0.1';

    try {
      let addr = ipaddr.parse(rawIp);

      if (addr instanceof ipaddr.IPv6 && addr.isIPv4MappedAddress()) {
        addr = addr.toIPv4Address();
      }

      return {
        ip: {
          address: addr.toString(),
          version: addr.kind(),
        },
      };
    } catch (error) {
      return {
        ip: {
          address: rawIp,
          version: 'unknown' as const,
        },
      };
    }
  });
