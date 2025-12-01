<?php
/**
 * 50 isolated worker tasks using ext-parallel (the PHP 8.x successor to pthreads).
 *
 * Requires a ZTS (Thread-Safe) PHP 8 build with ext-parallel installed:
 *   pecl install parallel
 *   php -m | grep parallel   # verify
 *
 * See php/README.md for setup notes.
 */

use parallel\Runtime;
use parallel\Future;

if (!extension_loaded('parallel')) {
    fwrite(STDERR, "ext-parallel is not loaded. Run on a ZTS PHP 8 build with ext-parallel.\n");
    exit(1);
}

$futures = [];

for ($i = 0; $i < 50; $i++) {
    $runtime = new Runtime();

    // Each task is self-contained: ext-parallel tasks are isolated, so we pass
    // everything the closure needs as arguments (no shared state).
    $futures[$i] = $runtime->run(function (int $i): int {
        // Bounded work (the pthreads original looped forever and never joined).
        for ($n = 0; $n < 3; $n++) {
            echo $i . "\n";
            sleep(1);
        }
        return $i;
    }, [$i]);
}

// Join every task by resolving its Future. This replaces the missing join()
// in the pthreads version and guarantees the script terminates cleanly.
foreach ($futures as $future) {
    /** @var Future $future */
    $future->value();
}
