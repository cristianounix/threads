import { Worker } from 'node:worker_threads';

const th1 = new Worker('./calc-no-channels.js')

th1.on("message", (msg) => {
  console.log("Main thread:", msg)
})

th1.postMessage({name: "Blaacccc"})


// const th2 = new Worker('./calc.js', {
//   workerData: {port: channelTh2.port1}, 
//   transferList: [channelTh2.port1]
// })


// channelTh1.port2.postMessage({ name: "Calling Th1" })
// channelTh2.port2.postMessage({ name: "Calling Th2" })

// channelTh1.port2.on("message", (msg) => {
//   console.log("Main thread PORT2:", msg)
// })
// channelTh2.port2.on("message", (msg) => {
//   console.log("Main thread PORT2:", msg)
// })

