#!/bin/bash

set -e

echo "Starting the application..."

./scripts/build.sh

npm run dev

echo "Application started successfully."
