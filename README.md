# PWA Boilerplate

## Table of Content

1. [Prerequisites](#prerequisites)
2. [Setup](#setup)
3. [Development](#development)

## Prerequisites

- [Docker](https://www.docker.com) / [Docker for Mac](https://docs.docker.com/docker-for-mac/) / [Docker for Windows](https://docs.docker.com/docker-for-windows/)
- [Local Docker Environment](https://github.com/aboutbits/local-environment)

## Setup

Install all dependencies by executing the following command:

```bash
docker-compose run --rm node npm install
```

Point the domain in your `/etc/hosts` file to your localhost:

```
127.0.0.1 web.aboutbits.local
```

To start the Docker containers, execute one of the following commands:

```bash
docker-compose up --detach

# or if you want to force a rebuild of the containers

docker-compose build --pull
docker-compose up --detach
```

## Development

For running the tests, execute the following command:

```bash
docker-compose run --rm node npm run test
```

## How does it work?


## Emerengy: How can we unregister a broken service-worker?

```
cp service-worker-noop.js service-worker.js
rm service-worker.ts
```

We will create a new service-worker that unregisters itself. Once we fix the bug we can than reneable the old service-worker removing `service-worker.js` again.

