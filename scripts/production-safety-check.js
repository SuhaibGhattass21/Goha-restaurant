#!/usr/bin/env node
/**
 * Production Environment Safety Check Script
 * Run this before deploying to production to ensure all safety measures are in place
 */

const { execSync } = require('child_process');
const fs = require('fs');

console.log("🔍 Running Production Safety Checks...");
console.log("=====================================");

let hasErrors = false;

// Check 1: Environment Variables
console.log("\n1. Checking Environment Variables...");
const requiredEnvVars = [
  'NODE_ENV',
  'DATABASE_URL',
  'JWT_SECRET'
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`   ❌ Missing required environment variable: ${envVar}`);
    hasErrors = true;
  } else {
    console.log(`   ✅ ${envVar}: Set`);
  }
}

// Check 2: Dangerous Environment Variables
console.log("\n2. Checking for Dangerous Settings...");
const dangerousSettings = [
  { name: 'TYPEORM_SYNCHRONIZE', value: 'true' },
  { name: 'TYPEORM_DROP_SCHEMA', value: 'true' },
  { name: 'DB_SYNCHRONIZE', value: 'true' },
  { name: 'DB_DROP_SCHEMA', value: 'true' }
];

for (const setting of dangerousSettings) {
  if (process.env[setting.name] === setting.value) {
    console.error(`   ❌ DANGEROUS: ${setting.name}=${setting.value} in production`);
    hasErrors = true;
  } else {
    console.log(`   ✅ Safe: ${setting.name} is not set to dangerous value`);
  }
}

// Check 3: Database Configuration
console.log("\n3. Checking Database Configuration...");
try {
  // Check if the database config file exists and has safe settings
  const dbConfigPath = './src/infrastructure/database/postgres/db.ts';
  if (fs.existsSync(dbConfigPath)) {
    const dbConfig = fs.readFileSync(dbConfigPath, 'utf8');
    
    if (dbConfig.includes('synchronize: false')) {
      console.log('   ✅ synchronize is set to false');
    } else if (dbConfig.includes('synchronize: true')) {
      console.error('   ❌ synchronize is set to true - this is dangerous in production');
      hasErrors = true;
    }
    
    if (dbConfig.includes('dropSchema: false')) {
      console.log('   ✅ dropSchema is set to false');
    } else if (dbConfig.includes('dropSchema: true')) {
      console.error('   ❌ dropSchema is set to true - this will delete all tables');
      hasErrors = true;
    }
  } else {
    console.error('   ❌ Database configuration file not found');
    hasErrors = true;
  }
} catch (error) {
  console.error(`   ❌ Error checking database configuration: ${error.message}`);
  hasErrors = true;
}

// Check 4: Package.json Scripts
console.log("\n4. Checking Package.json Scripts...");
try {
  const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
  
  // Check for dangerous scripts
  const dangerousScripts = ['schema:drop', 'schema:sync'];
  for (const scriptName of dangerousScripts) {
    if (packageJson.scripts[scriptName] && 
        !packageJson.scripts[scriptName].includes('echo') && 
        !packageJson.scripts[scriptName].includes('WARNING')) {
      console.error(`   ❌ Dangerous script enabled: ${scriptName}`);
      hasErrors = true;
    } else {
      console.log(`   ✅ Script ${scriptName} is safe or disabled`);
    }
  }
} catch (error) {
  console.error(`   ❌ Error checking package.json: ${error.message}`);
  hasErrors = true;
}

// Check 5: Migration Files
console.log("\n5. Checking Migration Safety...");
try {
  const migrationDir = './src/infrastructure/database/postgres/migrations';
  if (fs.existsSync(migrationDir)) {
    const migrationFiles = fs.readdirSync(migrationDir).filter(f => f.endsWith('.ts'));
    console.log(`   ✅ Found ${migrationFiles.length} migration files`);
    
    // Check if migrations have proper structure
    for (const file of migrationFiles.slice(0, 3)) { // Check first 3 migrations
      const migrationContent = fs.readFileSync(`${migrationDir}/${file}`, 'utf8');
      if (migrationContent.includes('public async up') && migrationContent.includes('public async down')) {
        console.log(`   ✅ Migration ${file} has proper up/down structure`);
      } else {
        console.warn(`   ⚠️  Migration ${file} may be missing up/down methods`);
      }
    }
  } else {
    console.error('   ❌ Migration directory not found');
    hasErrors = true;
  }
} catch (error) {
  console.error(`   ❌ Error checking migrations: ${error.message}`);
  hasErrors = true;
}

// Summary
console.log("\n=====================================");
console.log("🔍 Production Safety Check Complete");
console.log("=====================================");

if (hasErrors) {
  console.error("❌ PRODUCTION SAFETY CHECK FAILED");
  console.error("Please fix the issues above before deploying to production.");
  console.error("Your production database is at risk of data loss!");
  process.exit(1);
} else {
  console.log("✅ ALL PRODUCTION SAFETY CHECKS PASSED");
  console.log("Your application is ready for safe production deployment.");
  console.log("");
  console.log("Recommended deployment steps:");
  console.log("1. Backup your production database");
  console.log("2. Run migrations with: npm run migration:run:prod");
  console.log("3. Start the application with: npm run start:prod");
  process.exit(0);
}
