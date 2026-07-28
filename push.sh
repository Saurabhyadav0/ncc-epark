#!/bin/bash
set -e

echo "=== Staging and committing files ==="
git add .
git commit -m "Initial commit of epark: Urban Mobility System by Manish" || echo "No changes to commit"

echo "=== Configuring Git to use GitHub CLI credentials helper ==="
gh auth setup-git

echo "=== Setting remote origin to HTTPS ==="
git remote set-url origin https://github.com/Saurabhyadav0/ncc-epark.git || git remote add origin https://github.com/Saurabhyadav0/ncc-epark.git

echo "=== Pushing to GitHub (HTTPS) ==="
git push -u origin main
echo "=== Push complete! ==="
