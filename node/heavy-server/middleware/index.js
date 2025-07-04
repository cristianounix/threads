// const DB = require("../DB");
import DB from "../DB.js"

export const authenticate = (req, res, next) => {
  const routesToAuthenticate = [
    "GET /api/user",
    "PUT /api/user",
    "DELETE /api/logout",
  ];

  if (routesToAuthenticate.indexOf(req.method + " " + req.url) !== -1) {
    // If we have a token cookie, then save the userId to the req object
    if (req.headers.cookie) {
      const token = req.headers.cookie.split("=")[1];

      DB.update();
      const session = DB.sessions.find((session) => session.token === token);
      if (session) {
        req.userId = session.userId;
        return next();
      }
    }

    return res.status(401).json({ error: "Unauthorized" });
  } else {
    next();
  }
};

export const serveIndex = (req, res, next) => {
  const routes = ["/", "/login", "/profile", "/primes"];

  if (routes.indexOf(req.url) !== -1 && req.method === "GET") {
    return res.status(200).sendFile("./public/index.html", "text/html");
  } else {
    next();
  }
};
