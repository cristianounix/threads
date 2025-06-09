import { performance } from "node:perf_hooks"
import User  from "./controllers/user.js"
import generatePrimes from "./lib/prime_generator.js";
import { workerData } from "node:worker_threads";
// Controllers
// const User = require("./controllers/user");

export default (server) => {
  // ------------------------------------------------ //
  // ************ USER ROUTES ************* //
  // ------------------------------------------------ //

  // Log a user in and give them a token
  server.route("post", "/api/login", User.logUserIn);

  // Log a user out
  server.route("delete", "/api/logout", User.logUserOut);

  // Send user info
  server.route("get", "/api/user", User.sendUserInfo);

  // Update a user info
  server.route("put", "/api/user", User.updateUser);

  // ------------------------------------------------ //
  // ************ PRIME NUMBER ROUTES ************* //
  // ------------------------------------------------ //

  server.route("get", "/api/primes", (req, res) => {
    let startNum = BigInt(req.params.get("start"))
    const count = Number(req.params.get("count"))
    const start = performance.now()

    if(startNum < Number.MAX_SAFE_INTEGER) {
      startNum = Number(startNum)
    }

    const worker = new Worker("../lib/calc.js", {
      count,
      start: startNum
    })

    const t = setTimeout(() => {
      worker.terminate()
      res.status(408).json({
        msg:"timeout"
      })
    },5000)

    worker.on("message", (primes) => {
      clearTimeout(t)
      res.json({
        primes,
        time: ((performance.now() - start) / 1000).toFixed(2),
      });
    })
    
  });
};
