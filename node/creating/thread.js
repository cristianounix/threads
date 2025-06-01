import { Worker } from 'node:worker_threads';

const a = 400;


for(let i = 0; i < 2; i++) {
  const thread = new Worker("./calc.js")
}

// const th1 = new Worker("./calc.js")
// const th2 = new Worker("./calc.js")

// Bloqueando Main thread e assim perdendo os 
// eventos de ouput das threads filhas
// for(let i = 0; i<10_000_000_000; i++){}

// setTimeout(() => {
//   const th3 = new Worker("./calc.js")
// },0)

console.log(a)