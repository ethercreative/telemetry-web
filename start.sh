#!/bin/bash

set -o allexport; source .env; set +o allexport;
docker-compose run --rm node yarn --quiet;
docker-compose run --rm node yarn build;
docker-compose restart node;
docker-compose up -d;
