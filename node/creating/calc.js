import { Worker } from 'node:worker_threads'

// Create a new thread calling same file 
// that will create new theads every 5 seconds
// setTimeout(() => {
//   new Worker("./calc.js")
// },5000)

const a = 1000;

console.log(a)

// for(let i = 0; i<10_000_000_000; i++){}

setInterval(() => {}, 50)


process.exit(0)