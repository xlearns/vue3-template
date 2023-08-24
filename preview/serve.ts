const fs = require("fs");
const { resolve } = require("path");
const liveServer = require("live-server");

const rootURL = process.cwd();

const configFile = fs.readFileSync(
  resolve(rootURL, ".env.development"),
  "utf-8"
);

const configLines = configFile.split("\n");
const config = {};
configLines.forEach(line => {
  const trimmedLine = line.trim();
  if (trimmedLine && !trimmedLine.startsWith("#")) {
    const [key, value] = trimmedLine.split("=");
    config[key.trim()] = value.trim();
  }
});

let arrs = getAttr(JSON.parse(config["VITE_PROXY"]));

var params = {
  port: config["VITE_PORT"],
  host: "0.0.0.0",
  root: resolve(rootURL, "dist"),
  open: false,
  file: "index.html",
  logLevel: 2,
  proxy: arrs.map(([key, val]) => [key, val]),
  middleware: [
    function (req, res, next) {
      next();
    }
  ]
};

liveServer.start(params);

function getAttr(attr) {
  let _ = attr;
  if (!Array.isArray(_)) {
    _ = [];
  }
  return _;
}
