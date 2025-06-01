import { Worker } from 'node:worker_threads';
import { writeFile } from 'node:fs'
new Worker("./calc.js")

// setTimeout(() => {
//   writeFile("./text.txt", "Blabla", (err) => {
//     if(err){
//       return console.log(err)
//     }
//     console.log("File created!!")
//   })  
// }, 3000)

// Blocking the main thread
// while(true){}
