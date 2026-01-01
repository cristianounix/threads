
import {  parentPort } from "node:worker_threads"
import generatePrimes from "./prime_generator.js";


parentPort.on("message", ({ taskName, options }) => {
  switch(taskName) { 
    case "generatePrimes":
      const primes = generatePrimes(options.count, options.start, { 
        format: options.format, 
        log: options.log
      })
      parentPort.postMessage(primes)
      break;
    default:
      parentPort.postMessage("Unknown... ")
  }
})
