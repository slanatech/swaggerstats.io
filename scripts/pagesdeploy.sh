#!/bin/bash

# abort on errors
set -e

# navigate into the build output directory
cd pages

echo 'swaggerstats.io' > CNAME

git init
git add -A
git commit -m 'deploy for github pages'

git push -f https://github.com/slanatech/swaggerstats.io.git master:gh-pages

cd -
