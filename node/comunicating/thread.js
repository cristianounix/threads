import { Worker } from 'node:worker_threads';

const obj = {
  name: "joe"
}

// workerData function over clone algorithm
// check the file clone.js
new Worker("./calc.js", {
  workerData: obj
})

console.log("From main:", obj)