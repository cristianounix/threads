# PHP threads

Concurrency demos using **[ext-parallel](https://www.php.net/manual/en/book.parallel.php)**, the
supported successor to the abandoned `pthreads` extension (which does not exist in PHP 8.x).

## Requirements

ext-parallel requires a **ZTS (Thread-Safe)** PHP 8 build. The default Homebrew PHP is NTS
(Non-Thread-Safe) and will **not** run these scripts.

```sh
# Install a ZTS PHP 8, then:
pecl install parallel

# Enable in that PHP's php.ini:
#   zend_extension=opcache
#   extension=parallel

php -m | grep parallel   # verify it's loaded
```

## Files

- `thread.php` — spawns 50 isolated tasks via `parallel\Runtime`, each printing its index a few
  times, then joins them all through their `Future`s.
- `thread-message.php` — a worker and the main thread both produce data; they communicate over a
  `parallel\Channel` (no shared mutable state), then the collected result is printed.

## Run

```sh
php php/thread.php
php php/thread-message.php
```

If ext-parallel is not loaded the scripts exit with a message rather than fataling.
