#!/bin/bash
set -e

echo "=== Changing remote to SSH for devnouiq ==="
git remote set-url origin git@github.com:devnouiq/ncc-epark.git || git remote add origin git@github.com:devnouiq/ncc-epark.git

echo "=== Pushing to devnouiq/ncc-epark using SSH ==="
git push -u origin main

echo "=== Push complete! ==="
