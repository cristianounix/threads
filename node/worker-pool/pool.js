import { Worker } from "node:worker_threads"

class Poll {

  constructor(theadCount) {
    this.theadCount = theadCount; // Number of threads that will be spawned
    this.threads = []; // All of our worker threads (same length as threadCount)
    this.idleThreads = []; // Thread are not working
    this.scheduledTasks = []; // queue of tasks that need to be executed - nor running 


    for (let i=0; i<theadCount; i++) {
      this.spawnThread()
    }
  }

  spawnThread() {
    const worker = new Worker("./calc.js");
    // When we get a message from worker means that has finished task
    worker.on("message", (result) => {  
      const { callback } = worker.currentTask;
      if(callback) {
        callback(result)
      }

      this.idleThreads.push(worker)
      this.runNextTask()
    });
    this.threads.push(worker)
    this.idleThreads.push(worker) // Initially, all threads are idle
  }

  runNextTask() {
    // Check if there is scheduled tasks and there is no idle threads
    if(this.scheduledTasks.length > 0 && this.idleThreads.length > 0) {
      const worker = this.idleThreads.shift();
      const { taskName, options, callback} = this.scheduledTasks.shift();

      worker.currentTask = { taskName, options, callback};

      // Tell worker to start 
      worker.postMessage({ taskName, options })
    }
  }


  submit(taskName, options, callback) {
    this.scheduledTasks.push({
      taskName,
      options,
      callback
    })
    this.runNextTask()
  }

}


export default Poll;