#!/usr/bin/env node
/**
 * Emergency Database Recovery Script
 * Use this when the database is in an inconsistent state
 */

const { execSync } = require('child_process');
const fs = require('fs');

console.log("🚨 Emergency Database Recovery Script");
console.log("This will reset your database and rebuild from migrations");
console.log("");

// Check if we're in production
if (process.env.NODE_ENV === 'production') {
  console.log("WARNING: You are running this in PRODUCTION mode!");
  console.log("This will delete all data and rebuild the database schema.");
  console.log("Make sure you have a backup before proceeding!");
  console.log("");
  
  if (!process.argv.includes('--force')) {
    console.log("To proceed in production, add --force flag:");
    console.log("node scripts/emergency-db-recovery.js --force");
    process.exit(1);
  }
}

console.log("Starting emergency database recovery...");

try {
  console.log("Step 1: Building application...");
  execSync('npm run build', { stdio: 'inherit' });
  
  console.log("Step 2: Running migrations...");
  execSync('npm run migration:run:prod', { stdio: 'inherit' });
  
  console.log("Step 3: Verifying tables...");
  execSync('npm run verify:tables', { stdio: 'inherit' });
  
  console.log("Step 4: Seeding database...");
  execSync('npm run seed:prod', { stdio: 'inherit' });
  
  console.log("");
  console.log("Emergency database recovery completed successfully!");
  console.log("Your database has been restored and seeded with initial data.");
  console.log("");
  console.log("Default login credentials:");
  console.log("Username: admin");
  console.log("Password: admin123");
  console.log("");
  console.log("Remember to change the default password after first login!");
  
} catch (error) {
  console.error("");
  console.error("Emergency database recovery failed:");
  console.error(error.message);
  console.error("");
  console.error("Manual recovery steps:");
  console.error("1. Check your DATABASE_URL environment variable");
  console.error("2. Ensure PostgreSQL is running and accessible");
  console.error("3. Try running each command manually:");
  console.error("   npm run build");
  console.error("   npm run migration:run:prod");
  console.error("   npm run verify:tables"); 
  console.error("   npm run seed:prod");
  process.exit(1);
}
