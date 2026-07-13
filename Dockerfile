# ---------------------------------------------------------------------------
# Kadoorie Livewire Components — development / CI container
# Runs the PHP (Pint, Pest, Larastan) and JS (ESLint, Prettier, Jest,
# Playwright) quality gates. PHP 8.3 matches the package's minimum target.
# ---------------------------------------------------------------------------
FROM php:8.3-cli-bookworm

# System packages + PHP extension build dependencies.
RUN apt-get update && apt-get install -y --no-install-recommends \
        git \
        unzip \
        zip \
        curl \
        gnupg \
        ca-certificates \
        libzip-dev \
        libicu-dev \
        libonig-dev \
        sqlite3 \
        libsqlite3-dev \
    && docker-php-ext-install -j"$(nproc)" \
        intl \
        zip \
        pcntl \
        bcmath \
        mbstring \
        pdo_sqlite \
    && rm -rf /var/lib/apt/lists/*

# Node.js 20 + npm (for ESLint, Prettier, Jest, Playwright, Tailwind build).
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y --no-install-recommends nodejs \
    && rm -rf /var/lib/apt/lists/*

# Composer (pinned to v2).
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Keep the container alive so `docker exec kadoorie-app <cmd>` works.
CMD ["sleep", "infinity"]
