import { isMainThread, threadId, Worker } from "node:worker_threads"

if (isMainThread) {
  // const worker = new Worker("./isMainThread.js")
  const worker = new Worker("./isMainThread.js")
  console.log('Main thead', threadId)
} else {
  console.log('Is not main thead', threadId)
}