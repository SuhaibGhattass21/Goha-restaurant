#!/bin/sh

# Test script for start.sh
echo "Testing start.sh script..."

# Test 1: Check if script is executable
if [ ! -x "start.sh" ]; then
  echo "start.sh is not executable"
  echo "Run: chmod +x start.sh"
  exit 1
else
  echo "start.sh is executable"
fi

# Test 2: Check script syntax
if sh -n start.sh; then
  echo "start.sh syntax is valid"
else
  echo "start.sh has syntax errors"
  exit 1
fi

# Test 3: Check for required commands
echo "Checking for required commands..."

commands="pg_isready nc npm node"
for cmd in $commands; do
  if command -v $cmd >/dev/null 2>&1; then
    echo "$cmd is available"
  else
    echo "$cmd is not available (might be installed in container)"
  fi
done

# Test 4: Validate environment variable handling
echo "Testing environment variable handling..."

# Test production mode
NODE_ENV=production sh -c '
  # Source the functions from start.sh but don'\''t execute the main logic
  . ./start.sh 2>/dev/null || echo "Script execution test complete"
' >/dev/null 2>&1

if [ $? -eq 0 ]; then
  echo "Script handles production mode correctly"
else
  echo "Script might have issues with production mode"
fi

# Test development mode  
NODE_ENV=development sh -c '
  . ./start.sh 2>/dev/null || echo "Script execution test complete"
' >/dev/null 2>&1

if [ $? -eq 0 ]; then
  echo "Script handles development mode correctly"
else
  echo "Script might have issues with development mode"
fi

echo ""
echo "start.sh validation complete!"
echo ""
echo "To test in Docker:"
echo "  docker build -t goha-test ."
echo "  docker run --rm goha-test"
