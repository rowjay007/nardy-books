#!/bin/bash

set -e

echo "Starting the application..."

./scripts/build.sh

pm2 start ecosystem.config.js --env production

echo "Application started successfully."
