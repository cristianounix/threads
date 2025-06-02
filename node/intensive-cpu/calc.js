import { workerData, parentPort } from "node:worker_threads";
import generatePrimes from "./prime_generator.js";


const primes = generatePrimes(workerData.count, workerData.start);

parentPort.postMessage(primes)

