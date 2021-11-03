const { https } = require("firebase-functions");
const next = require("next");
const express = require("express");
const routes = require("next-routes");
const cookieParser = require("cookie-parser");

const app = next({
  dev: false,
  conf: { distDir: ".next" },
});

const handle = routes().getRequestHandler(app);

const server = express();
server.use(express.json({ limit: "30mb" }));
server.use(cookieParser("ajldhaoweirjlah3986712hkj"));

server.post("/api/login", (req, res) => {
  const { email } = req.body;

  if (email === "gee@pornhub.gov") {
    const user = { name: "adrian", id: email, role: "director" };

    res.cookie("__session", user, {
      httpOnly: true,
      secure: true,
      signed: true,
      sameSite: "strict",
      maxAge: 5 * 60 * 1000,
    });
    return res.json({ message: "success" });
  } else {
    res.status(404).json({ message: "User Not Found" });
  }
});

server.get("/api/profile", (req, res) => {
  const { signedCookies } = req;
  const { access } = signedCookies;
  console.log("signeer => ", signedCookies);
  console.log("cookie => ", req.headers.cookie);
  if (access && access.id) {
    return res.status(200).json({ message: "life is good nigga" });
  }

  res.status(401).json({ message: "Unauthorized" });
});

server.get("/api/tester", (req, res) => {
  res.status(401).json({ message: "Unauthorized" });
});

server.get("*", (req, res) => {
  return handle(req, res);
});

exports.nextServer = https.onRequest(server);
