#!/usr/bin/env node

const { Client } = require('pg');

async function verifyTables() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL
  });
  
  try {
    console.log("Connecting to database for table verification...");
    await client.connect();
    console.log("Connected to database successfully");
    
    // Check essential tables that must exist for the application to function
    const essentialTables = [
      'users',
      'permissions', 
      'user_permissions',
      'categories',
      'products',
      'orders',
      'shifts'
    ];
    
    console.log("Verifying essential tables exist...");
    
    for (const table of essentialTables) {
      try {
        const res = await client.query(`
          SELECT EXISTS (
            SELECT FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name = $1
          )`, [table]);
          
        if (!res.rows[0].exists) {
          throw new Error(`Essential table '${table}' does not exist!`);
        }
        
        console.log(`✓ Table '${table}' verified`);
      } catch (err) {
        console.error(`✗ Failed to verify table '${table}':`, err.message);
        throw err;
      }
    }
    
    // Additional verification: Check that users table has expected columns
    console.log("Verifying table structure...");
    const userColumnsRes = await client.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'users' 
      AND table_schema = 'public'
      ORDER BY ordinal_position;
    `);
    
    const userColumns = userColumnsRes.rows.map(row => row.column_name);
    const requiredColumns = ['id', 'username', 'password', 'full_name'];
    
    for (const col of requiredColumns) {
      if (!userColumns.includes(col)) {
        throw new Error(`Required column '${col}' missing from users table`);
      }
      console.log(`✓ Column 'users.${col}' verified`);
    }
    
    console.log("✅ All database table verification checks passed!");
    console.log(`Found ${essentialTables.length} essential tables with proper structure`);
    
  } catch (err) {
    console.error("❌ Database table verification failed:", err.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

// Run verification if this script is called directly
if (require.main === module) {
  verifyTables()
    .then(() => {
      console.log("Database verification completed successfully");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Database verification failed:", error.message);
      process.exit(1);
    });
}

module.exports = { verifyTables };
