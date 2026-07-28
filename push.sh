#!/bin/bash
set -e

echo "=== Initializing Local Git Repository ==="
if [ ! -d .git ]; then
    git init
    git branch -M main
fi

echo "=== Adding project files ==="
git add .

echo "=== Creating initial commit ==="
git commit -m "Initial commit of epark: Urban Mobility System by Manish" || echo "No changes to commit or already committed."

echo "=== Creating GitHub repository and pushing ==="
# Creates a public repository on the authenticated GitHub account (Saurabhyadav0)
# and pushes the main branch to it
gh repo create ncc-epark --public --source=. --remote=origin --push

echo "=== Push to GitHub complete! ==="
