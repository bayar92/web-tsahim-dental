import { createServer } from "http";
import { parse } from "url";
import next from "next";
import { startScheduler } from "./lib/scheduler.js"; // .js заавал!

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const port = parseInt(process.env.PORT || "3000", 10);
const handle = app.getRequestHandler();

const host = process.env.HOST || "0.0.0.0";

app.prepare().then(() => {
  createServer((req, res) => {
    handle(req, res, parse(req.url, true));
  }).listen(port, host, () => {
    console.log(
      `> Server listening at http://${host}:${port} as ${
        dev ? "development" : process.env.NODE_ENV
      }`
    );
    startScheduler();
  });
});
