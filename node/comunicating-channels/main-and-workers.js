import { Worker, MessageChannel } from 'node:worker_threads';

// Communicating between 2 worker threads
const channelTh1 = new MessageChannel();
const channelTh2 = new MessageChannel();

const th1 = new Worker('./calc.js', {
  workerData: {port: channelTh1.port1}, 
  transferList: [channelTh1.port1]
})
const th2 = new Worker('./calc.js', {
  workerData: {port: channelTh2.port1}, 
  transferList: [channelTh2.port1]
})


channelTh1.port2.postMessage({ name: "Calling Th1" })
channelTh2.port2.postMessage({ name: "Calling Th2" })


// port1.on("message", (msg) => {
//   console.log("PORT1:", msg)
// })
// port2.on("message", (msg) => {
//   console.log("PORT2:", msg)
// })

