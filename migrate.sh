#!/bin/bash

set -o allexport; source .env; set +o allexport;

docker-compose exec -T postgres psql -U $DB_USER -d $DB_DATABASE < db/schema.sql;
