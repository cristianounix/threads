import { MessageChannel } from 'node:worker_threads';

const channel = new MessageChannel();

const port1 = channel.port1
const port2 = channel.port2

port1.postMessage({ name: "Bla" })
port2.postMessage({ name: "AAA" })


port1.on("message", (msg) => {
  console.log("PORT1:", msg)
})
port2.on("message", (msg) => {
  console.log("PORT2:", msg)
})


