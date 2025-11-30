import { createServer } from "http";
import { parse } from "url";
import next from "next";
import { startScheduler } from "./lib/scheduler.js"; // .js заавал!

startScheduler();

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const port = parseInt(process.env.PORT || "3001", 10);
const handle = app.getRequestHandler();
app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    if (!dev && req.headers["x-forwarded-proto"] != "https") {
      const { host } = parse(process.env.NEXT_PUBLIC_APP_URL);
      res.writeHead(302, {
        Location: `https://${host}${req.url}`,
      });
      res.end();
    } else {
      handle(req, res, parsedUrl);
    }
  }).listen(port);

  // tslint:disable-next-line:no-console
  console.log(
    `> Server listening at http://localhost:${port} as ${
      dev ? "development" : process.env.NODE_ENV
    }`
  );
});
