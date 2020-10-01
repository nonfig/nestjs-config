#!/bin/bash

# Generate package

# Files to copy to dist folder
files_to_copy=(
  package.json
  package-lock.json
  README.md
  LICENSE
)

for file in "${files_to_copy[@]}"; do
  cp $file dist
  echo 🔹  $file copied  ✅
done

echo '📦📦📦 Packaged successfully! 📦📦📦'
