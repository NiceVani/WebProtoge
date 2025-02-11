#!/bin/bash
set -e

echo "Prepare releasing."
echo "Reading version from package.json ..."
echo "====================================="
echo -e "\n"

VERSION=`node -p "require('./package.json').version"`

read -p "Releasing v$VERSION - Are you sure? (y/n) " -n 1 -r

if [[ $REPLY =~ ^[Yy]$ ]]
  then

  echo -e "\n"

  echo "Build dist:"
  npm run build
  git add -A
  git commit -m "Release v$VERSION"
  echo "Build dist done!"

  echo -e "\n"

  echo "Create tag:"
  git tag -a v"$VERSION" -m "v$VERSION"
  echo "Create tag done!"

  git push origin master
  git push origin v"$VERSION"
  echo "Push to origin done!"

  echo -e "\n"

  echo "Publish to npm:"
  npm publish
  echo "Publish to npm done!"

fi
