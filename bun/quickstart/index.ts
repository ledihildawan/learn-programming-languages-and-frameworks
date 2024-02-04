import type { Server } from "bun";

import figlet from "figlet";

const server: Server = Bun.serve({
  port: 3000,
  fetch(): Response {
    figlet("Hello World!!", function (err, data) {
      if (err) {
        console.log("Something went wrong...");
        console.dir(err);
        return;
      }
      console.log(data);
    });

    return new Response('Bun!');
  },
});

console.log(`Listening on http://localhost:${server.port} ...`);
