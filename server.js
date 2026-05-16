import { createServer } from "http";
import { parse } from "url";
import next from "next";
import { startScheduler } from "./lib/scheduler.js"; // .js заавал!

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const port = parseInt(process.env.PORT || "3000", 10);
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    handle(req, res, parse(req.url, true));
  }).listen(port, () => {
    console.log(
      `> Server listening at http://localhost:${port} as ${
        dev ? "development" : process.env.NODE_ENV
      }`
    );
    startScheduler();
  });
});
