<?php
/**
 * Worker + main producing shared data, using ext-parallel message passing.
 *
 * ext-parallel has no shared mutable objects (unlike pthreads' Threaded), so the
 * worker and main communicate over a Channel instead of a shared object. This
 * avoids the pthreads array-append pitfall and the unsynchronized race condition
 * of the original.
 *
 * Requires a ZTS PHP 8 build with ext-parallel. See php/README.md.
 */

use parallel\Runtime;
use parallel\Channel;

if (!extension_loaded('parallel')) {
    fwrite(STDERR, "ext-parallel is not loaded. Run on a ZTS PHP 8 build with ext-parallel.\n");
    exit(1);
}

// Buffered channel so senders never block on a full/absent reader.
$channel = Channel::make('data', Channel::Infinite);

$runtime = new Runtime();

// Worker task: only the channel name is passed in (channels are looked up by
// name inside the task), keeping the closure self-contained.
$future = $runtime->run(function (string $channelName): void {
    $channel = Channel::open($channelName);
    for ($i = 0; $i < 5; $i++) {
        $channel->send("Worker: $i");
        echo "Worker: $i\n";
        sleep(1);
    }
    // Signal that this producer is done.
    $channel->send(null);
}, ['data']);

$collected = [];

// Main also produces data.
for ($i = 0; $i < 5; $i++) {
    $collected[] = "Main: $i";
    echo "Main: $i\n";
    sleep(1);
}

// Drain the worker's messages until the completion sentinel.
while (($message = $channel->recv()) !== null) {
    $collected[] = $message;
}

// Wait for the worker to finish (replaces $worker->join()).
$future->value();

$channel->close();

echo "\nShared Data:\n";
print_r($collected);
