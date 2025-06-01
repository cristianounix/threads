import { Worker, workerData } from 'node:worker_threads'

const port = workerData.port

port.postMessage({ name: "Worker send a message" })

port.on("message", (msg) => {
  console.log("Worker msg:", msg)
})