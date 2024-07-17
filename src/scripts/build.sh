#!/bin/bash

set -e

echo "Starting the build process..."

npm install

npm run build

echo "Build process completed successfully."
