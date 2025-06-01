import { Worker, workerData, parentPort } from 'node:worker_threads'

const port = parentPort

port.postMessage({ name: "Worker send a message "+Date.now().toString() })

port.on("message", (msg) => {
  console.log("Worker msg:", msg)
})