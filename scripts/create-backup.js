#!/usr/bin/env node
/**
 * Database Backup Script for Production Safety
 * Creates a backup before running dangerous operations
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log("Creating Database Backup...");

// Check if we have the required environment variables
if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL environment variable is required");
  process.exit(1);
}

// Create backups directory if it doesn't exist
const backupDir = './backups';
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
  console.log(`Created backup directory: ${backupDir}`);
}

// Generate backup filename with timestamp
const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0] + '_' + 
                 new Date().toISOString().replace(/[:.]/g, '-').split('T')[1].split('.')[0];
const backupFilename = `backup_${timestamp}.sql`;
const backupPath = path.join(backupDir, backupFilename);

try {
  console.log(`Creating backup: ${backupFilename}`);
  
  // Extract database connection details from DATABASE_URL
  const dbUrl = new URL(process.env.DATABASE_URL);
  const dbHost = dbUrl.hostname;
  const dbPort = dbUrl.port || 5432;
  const dbName = dbUrl.pathname.slice(1); // Remove leading slash
  const dbUser = dbUrl.username;
  const dbPassword = dbUrl.password;

  // Set PGPASSWORD environment variable for pg_dump
  const env = { ...process.env, PGPASSWORD: dbPassword };

  // Create backup using pg_dump
  const command = `pg_dump -h ${dbHost} -p ${dbPort} -U ${dbUser} -d ${dbName} --verbose --clean --no-owner --no-privileges > ${backupPath}`;
  
  console.log("Running pg_dump...");
  execSync(command, { env, stdio: 'inherit' });
  
  // Verify backup was created and has content
  const stats = fs.statSync(backupPath);
  if (stats.size > 0) {
    console.log(`Backup created successfully: ${backupPath}`);
    console.log(`Backup size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
    
    // Keep only the last 10 backups
    const backupFiles = fs.readdirSync(backupDir)
      .filter(file => file.startsWith('backup_') && file.endsWith('.sql'))
      .map(file => ({
        name: file,
        path: path.join(backupDir, file),
        mtime: fs.statSync(path.join(backupDir, file)).mtime
      }))
      .sort((a, b) => b.mtime - a.mtime);

    if (backupFiles.length > 10) {
      const filesToDelete = backupFiles.slice(10);
      filesToDelete.forEach(file => {
        fs.unlinkSync(file.path);
        console.log(`🗑️  Deleted old backup: ${file.name}`);
      });
    }
    
    console.log("");
    console.log("Database backup completed successfully!");
    console.log(`Backup location: ${backupPath}`);
    console.log("");
    console.log("To restore this backup:");
    console.log(`psql -h ${dbHost} -p ${dbPort} -U ${dbUser} -d ${dbName} < ${backupPath}`);
    
  } else {
    throw new Error("Backup file was created but appears to be empty");
  }

} catch (error) {
  console.error("Backup failed:", error.message);
  console.error("");
  console.error("Troubleshooting steps:");
  console.error("1. Ensure pg_dump is installed and accessible");
  console.error("2. Verify DATABASE_URL is correct");
  console.error("3. Check database connectivity");
  console.error("4. Ensure sufficient disk space");
  
  // Clean up empty backup file if it exists
  if (fs.existsSync(backupPath)) {
    const stats = fs.statSync(backupPath);
    if (stats.size === 0) {
      fs.unlinkSync(backupPath);
      console.error("Removed empty backup file");
    }
  }
  
  process.exit(1);
}
