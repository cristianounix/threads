<?php
class BlaData extends Threaded {
    public $data = [];

    public function addData($value) {
        $this->data[] = $value;
    }

    public function getData() {
        return $this->data;
    }
}

class WorkerThread extends Thread {
    private $sharedData;

    public function __construct($sharedData) {
        $this->sharedData = $sharedData;
    }

    public function run() {
        for ($i = 0; $i < 5; $i++) {
            $this->sharedData->addData("Worker: $i");
            echo "Worker: $i\n";
            sleep(1);
        }
    }
}

$sharedData = new BlaData();

$worker = new WorkerThread($sharedData);
$worker->start();

for ($i = 0; $i < 5; $i++) {
    $sharedData->addData("Main: $i");
    echo "Main: $i\n";
    sleep(1);
}

// Wait finish
$worker->join();

echo "\nShared Data:\n";
print_r($sharedData->getData());
?>