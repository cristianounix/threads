import { Worker } from "node:worker_threads";
import { performance } from "perf_hooks";

// BigInts
// const num = 100_000_000_000_000n
// 1 thread  = 1559.1382500000002ms
// 2 Threads = 870.714083ms
// 4 Threads = 475.970875ms
// 6 Threads = 382.96425ms


const num = 100_000_000_000_000
// 1 thread  = 36572.12225ms
// 2 Threads = 18907.639750000002ms
// 4 Threads = 9444.775625ms
// 6 Threads = 6703.419167ms

let result = []
let completedTHs = 0
const THS = 1
const count = 200 // number of prime numbers that we want
const start = performance.now();
for(let i = 0; i < THS; i++) {
  const worker = new Worker("./calc.js", {
    workerData: {
      count: count/THS,
      start: num + i * 300
      // start: num + BigInt(i * 300)
    }
  })

  const threadId = worker.threadId;
  console.log('Worker ID', threadId)

  worker.on("message", (primes) => {
    result = result.concat(primes)
  })

  worker.on("error", (err) => {
    console.error(err)
  })

  worker.on("exit", (code) => {
    completedTHs++
    console.log('Worker terminated ', threadId)
    if(completedTHs == THS) {
      console.log(`Time Taken: ${performance.now() - start}ms`);
      console.log(result.sort())
    }

    //
    if(code !== 0) {
      console.log('Worker exited with code: ', code)
    }
  })
}

