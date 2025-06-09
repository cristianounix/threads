// const cluster = require("node:cluster");
import cluster from "node:cluster"
// require("node:os")
import os from "node:os"

if (cluster.isPrimary) {
  let coreCount = os.availableParallelism();
  coreCount = 2
  for (let i = 0; i < coreCount; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(
      `Worker ${worker.process.pid} died (${signal} | ${code}). Restarting...`
    );
    cluster.fork();
  });
} else {
  // require("./index.js");
  import("./index.js")
}
