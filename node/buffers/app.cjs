const { Buffer } = require('buffer');

const buf = Buffer.allocUnsafe(10000);

for (let i = 0; i < buf.length; i++) {
  if(buf[i] !== 0) {
    console.log(`Element at position ${i} is not zero: ${buf[i].toString(2)}`);
  }
}

const s = Buffer.from("100",'ascii');

console.log(' shift binary s',  s.toString('binary'));

console.log(' shift binary s',  s >>> 1);
console.log(' shift binary s',  s.toString('binary'));

// function printMemoryUsage(message) {
//   const used = process.memoryUsage();
//   console.log(message);
//   for (let key in used) {
//     console.log(`  ${key} ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`);
//   }
// }


// printMemoryUsage('Initial memory usage:');


// const memory = Buffer.alloc(4); // Allocate a buffer of 4 bytes
// console.log('Allocated Buffer:', memory);
// console.log('First:', memory[0]);


// memory[0] = 0xf4; // Set the first byte to 0xf4
// console.log('First:', memory[0]);


// // // Fill the buffer with a specific value
// // memory.fill(0xFF);
// // console.log('Filled Buffer:', memory);

// // Create a buffer from a string
// const bufferFromString = Buffer.from('Hello, World!', '');
// console.log('Buffer from string:', bufferFromString);