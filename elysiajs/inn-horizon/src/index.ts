import { Elysia } from "elysia";
import { validateEnv } from "./config/env";
import { authRoute } from "./modules/auth";
import { usersRoute } from "./modules/users";
import { hotelsRoute } from "./modules/hotels";
import { roomsRoute } from "./modules/rooms";
import { bookingsRoute } from "./modules/bookings";
import { paymentsRoute } from "./modules/payments";
import { webhooksRoute } from "./modules/webhooks";

// Validate environment variables
validateEnv();

const app = new Elysia()
  .get("/", () => {
    return {
      message: "Welcome to Inn Horizon API",
      version: "1.0.0",
      endpoints: {
        auth: "/api/auth",
        users: "/api/users",
        hotels: "/api/hotels",
        rooms: "/api/rooms",
        bookings: "/api/bookings",
        reviews: "/api/reviews",
        payments: "/api/payments",
        webhooks: "/api/webhooks",
      },
    };
  })
  .get("/health", () => {
    return {
      status: "ok",
      timestamp: new Date().toISOString(),
    };
  })
  .group("/api", (app) =>
    app
      .use(authRoute)
      .use(usersRoute)
      .use(hotelsRoute)
      .use(roomsRoute)
      .use(bookingsRoute)
      .use(paymentsRoute)
      .use(webhooksRoute),
  )
  .onError(({ error, code, set }) => {
    console.error(`Error [${code}]:`, error);

    if (code === "NOT_FOUND") {
      set.status = 404;
      return {
        success: false,
        error: "Route not found",
      };
    }

    if (code === "VALIDATION") {
      set.status = 400;
      return {
        success: false,
        error: "Validation error",
        details: error.message,
      };
    }

    if (code === "PARSE") {
      set.status = 400;
      return {
        success: false,
        error: "Invalid request format",
      };
    }

    set.status = 500;
    return {
      success: false,
      error: "Internal server error",
    };
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
console.log(
  `📚 API Documentation available at http://${app.server?.hostname}:${app.server?.port}`,
);
console.log(
  `🔐 Auth endpoints: http://${app.server?.hostname}:${app.server?.port}/api/auth`,
);
console.log(
  `👤 User endpoints: http://${app.server?.hostname}:${app.server?.port}/api/users`,
);
console.log(
  `🏨 Hotel endpoints: http://${app.server?.hostname}:${app.server?.port}/api/hotels`,
);
console.log(
  `🛏️  Room endpoints: http://${app.server?.hostname}:${app.server?.port}/api/rooms`,
);
console.log(
  `📅 Booking endpoints: http://${app.server?.hostname}:${app.server?.port}/api/bookings`,
);
console.log(
  `💳 Payment endpoints: http://${app.server?.hostname}:${app.server?.port}/api/payments`,
);
console.log(
  `🔔 Webhook endpoints: http://${app.server?.hostname}:${app.server?.port}/api/webhooks`,
);
