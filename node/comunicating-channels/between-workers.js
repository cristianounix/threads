import { Worker, MessageChannel } from 'node:worker_threads';

// Communicating between 2 worker threads
const {port1, port2} = new MessageChannel();

// transferList could be a: 
// - MessagePort (port1, port2)
// - ArrayBuffer
// - FileHandleObject
// Transfer list will transfer the ownership object to the thread
const th1 = new Worker('./calc.js', {
  workerData: {port: port1}, 
  transferList: [port1]
})
const th2 = new Worker('./calc.js', {
  workerData: {port: port2}, 
  transferList: [port2]
})


// port1.postMessage({ name: "Bla" })
// port2.postMessage({ name: "AAA" })


// port1.on("message", (msg) => {
//   console.log("PORT1:", msg)
// })
// port2.on("message", (msg) => {
//   console.log("PORT2:", msg)
// })

