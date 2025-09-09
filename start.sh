#!/bin/sh

set -e

echo "Starting Goha Restaurant Cafe System..."

check_db() {
  echo "Checking database connectivity..."
  max_retries=30
  retry_count=0
  
  while [ $retry_count -lt $max_retries ]; do
    if pg_isready -h db -p 5432 -U postgres 2>/dev/null || nc -z db 5432 2>/dev/null; then
      echo "Database is ready!"
      return 0
    fi
    
    retry_count=$((retry_count + 1))
    echo "Database not ready, waiting... ($retry_count/$max_retries)"
    sleep 2
  done
  
  echo "Database failed to become ready after $max_retries attempts"
  exit 1
}

run_migrations() {
  echo "Running database migrations..."
  max_retries=5
  retry_count=0
  
  while [ $retry_count -lt $max_retries ]; do
    if npm run migration:run:prod 2>&1; then
      echo "Migrations completed successfully!"
      return 0
    fi
    
    retry_count=$((retry_count + 1))
    echo "Migration attempt $retry_count failed, retrying..."
    sleep 5
  done
  
  echo "Migrations failed after $max_retries attempts"
  echo "Cannot start application without proper database schema"
  exit 1
}

seed_database() {
  echo "Seeding database with initial data..."
  max_retries=3
  retry_count=0
  
  while [ $retry_count -lt $max_retries ]; do
    if npm run seed:prod 2>&1; then
      echo "Database seeding completed successfully!"
      return 0
    fi
    
    retry_count=$((retry_count + 1))
    echo "Seeding attempt $retry_count failed, retrying..."
    sleep 3
  done
  
  echo "Database seeding failed after $max_retries attempts"
  echo "Continuing with application startup..."
}

verify_tables() {
  echo "Verifying essential database tables exist..."
  max_retries=3
  retry_count=0
  
  while [ $retry_count -lt $max_retries ]; do
    if node scripts/verify-tables.js 2>&1; then
      echo "Database table verification completed successfully!"
      return 0
    fi
    
    retry_count=$((retry_count + 1))
    echo "Table verification attempt $retry_count failed, retrying..."
    sleep 3
  done
  
  echo "Table verification failed after $max_retries attempts"
  echo "Cannot start application - essential database tables are missing"
  exit 1
}

if [ "$NODE_ENV" = "production" ]; then
  echo "Production mode detected"
  
  check_db
  
  run_migrations
  
  verify_tables
  
  seed_database
else
  echo "Development mode detected, skipping migration check"
fi

echo "Starting the application..."
exec npm start