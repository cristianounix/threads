import { Worker, workerData } from 'node:worker_threads'

const obj = workerData

obj.name = 'Cris'

console.log("From child thrad:", obj)
