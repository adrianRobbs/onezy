const functions = require("firebase-functions");
const next = require("next");
const express = require("express");
const cookieParser = require("cookie-parser");

const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 3000;
const app = next({ dev });
const handle = app.getRequestHandler();

let config = {};
if (Object.keys(functions.config()).length > 0) config = functions.config();
else config = require("./env.json");

console.log("killer ", config);

app.prepare().then(() => {
  const server = express();
  server.use(express.json({ limit: "30mb" }));
  server.use(cookieParser("ajldhaoweirjlah3986712hkj"));

  server.post("/api/login", (req, res) => {
    const { email } = req.body;

    if (email === "gee@pornhub.gov") {
      const user = { name: "adrian", id: email, role: "director" };

      res.cookie("refresh", user, {
        httpOnly: true,
        secure: !dev,
        signed: true,
        sameSite: "strict",
        domain: "localhost",
      });
      res.cookie("shoalin", user, {
        httpOnly: true,
        secure: !dev,
        signed: true,
        sameSite: "strict",
        domain: "localhost",
      });
      res.cookie(
        "__session",
        { name: "kukua", id: "X452qgh" },
        {
          httpOnly: true,
          secure: !dev,
          signed: true,
          sameSite: "strict",
          domain: "localhost",
        }
      );
      // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
      // res.setHeader("Access-Control-Allow-Credentials", true);
      res.json({ message: "success" });
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

  server.get("/tester", (req, res) => {
    res.json({ envalue: config.user.id });
  });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`Listening on PORT ${port}`);
  });
});
