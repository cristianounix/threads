import { workerData, prentPort, parentPort } from "node:worker_threads"
import generatePrimes from "./lib/prime_generator"

const primes = generatePrimes(count, startNum, { format: true })


parentPort.postMessage(primes)