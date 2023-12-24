const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const bodyParser = require("body-parser");

const jwtToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU2l0ZVBvaW50IFJlYWRlciJ9.sS4aPcmnYfm3PQlTtH14az9CGjWkjnsDyG_1ats4yYg`;

server.use(middlewares);

server.use(bodyParser.json());

server.post("/sign-in", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username === "demo" && password === "demo") {
    res.json({
      name: "SitePoint Reader",
      token: jwtToken,
    });
  }

  res.send(422, "Invalid username and password");
});

server.use((req, res, next) => {
  if (isAuthorized(req)) {
    next();
  } else {
    res.sendStatus(401);
  }
});

server.use(router);

server.listen(3000, () => {
  console.log("JSON Server is running");
});

function isAuthorized(req) {
  const bearer = req.get("Authorization");

  if (bearer === `Bearer ${jwtToken}`) {
    return true;
  }

  return false;
}
