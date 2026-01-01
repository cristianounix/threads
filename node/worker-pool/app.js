import { performance } from "node:perf_hooks"
import Pool from "./pool.js"

const NUM_WORKERS = 2;
const poll = new Pool(NUM_WORKERS)


// poll.submit("generatePrimes", {
//   count: 20,
//   star: 10_000_000_000,
//   format: true,
//   log: false
// }, (primes) => {
//   console.log("Primes generated:", primes)
// })

let result = []
let tasksDoneCount = 0
const totalTasks = 200_000
const start = performance.now()

for(let i=0; i < totalTasks; i++) {
  poll.submit("generatePrimes", {
    count: 20,
    star: 10_000_000_000,
    format: true,
    log: false
  }, (primes) => {
    console.log("Event loop utilization:", performance.eventLoopUtilization())
    console.log("primes generate:", primes)
    tasksDoneCount++
    // console.log("Primes generated:", primes)
    result = result.concat(primes)
    if(tasksDoneCount == totalTasks) {
      console.log("Time spent (ms):", performance.now() - start)
      console.log(result.sort())
      process.exit(0)
    }
  })
}