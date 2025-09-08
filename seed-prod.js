// Add require for reflect-metadata first
require("reflect-metadata");

// Debug: Check what files are available
const fs = require("fs");
const path = require("path");

console.log("Checking dist directory structure...");
if (fs.existsSync("./dist")) {
  console.log("dist directory exists");
  const distContents = fs.readdirSync("./dist");
  console.log("dist contents:", distContents);
  
  if (fs.existsSync("./dist/infrastructure")) {
    console.log("infrastructure directory exists");
    const infraContents = fs.readdirSync("./dist/infrastructure");
    console.log("infrastructure contents:", infraContents);
    
    if (fs.existsSync("./dist/infrastructure/database")) {
      console.log("database directory exists");
      const dbContents = fs.readdirSync("./dist/infrastructure/database");
      console.log("database contents:", dbContents);
      
      if (fs.existsSync("./dist/infrastructure/database/postgres")) {
        console.log("postgres directory exists");
        const pgContents = fs.readdirSync("./dist/infrastructure/database/postgres");
        console.log("postgres contents:", pgContents);
      }
      
      if (fs.existsSync("./dist/infrastructure/database/models")) {
        console.log("models directory exists");
        const modelsContents = fs.readdirSync("./dist/infrastructure/database/models");
        console.log("models contents:", modelsContents);
      }
    }
  }
} else {
  console.log("dist directory does not exist");
}

let AppDataSource, User, Permissions, UserPermission;

try {
  // Try different require paths
  console.log("Attempting to require database connection...");
  const dbModule = require("./dist/infrastructure/database/postgres/db.js");
  console.log("Database module loaded successfully:", Object.keys(dbModule));
  AppDataSource = dbModule.AppDataSource;
  
  console.log("Attempting to require models...");
  const modelsModule = require("./dist/infrastructure/database/models/index.js");
  console.log("Models module loaded successfully:", Object.keys(modelsModule));
  User = modelsModule.User;
  Permissions = modelsModule.Permissions;
  UserPermission = modelsModule.UserPermission;
  
} catch (error) {
  console.error("Failed to load modules:", error.message);
  console.log("Trying alternative paths...");
  
  try {
    // Try without .js extension
    AppDataSource = require("./dist/infrastructure/database/postgres/db").AppDataSource;
    const models = require("./dist/infrastructure/database/models");
    User = models.User;
    Permissions = models.Permissions;
    UserPermission = models.UserPermission;
  } catch (altError) {
    console.error("Alternative paths also failed:", altError.message);
    process.exit(1);
  }
}

const bcrypt = require("bcrypt");

async function seedDatabase() {
  try {
    console.log("Starting database seeding...");

    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const userRepository = AppDataSource.getRepository(User);
    const permissionRepository = AppDataSource.getRepository(Permissions);
    const userPermissionRepository = AppDataSource.getRepository(UserPermission);

    // Check if admin user already exists
    const existingAdmin = await userRepository.findOne({
      where: { username: "admin" }
    });

    if (existingAdmin) {
      console.log("Admin user already exists, skipping seeding");
      return;
    }

    // Create default permissions
    const defaultPermissions = [
      { name: "OWNER_ACCESS", description: "Full owner access to all features" },
      { name: "access:users", description: "Access to user management" },
      { name: "access:permissions", description: "Access to permission management" },
      { name: "access:cashier", description: "Access to cashier features" },
      { name: "access:category", description: "Access to category management" },
      { name: "access:products", description: "Access to product management" },
      { name: "access:shift", description: "Access to shift management" },
      { name: "access:workers", description: "Access to worker management" },
      { name: "access:stock", description: "Access to stock management" },
      { name: "access:orders", description: "Access to order management" },
      { name: "access:expenses", description: "Access to expense management" },
      { name: "access:reports", description: "Access to reports" },
      { name: "shift:summary", description: "Access to shift summary features" },
    ];

    console.log("Creating default permissions...");
    for (const permData of defaultPermissions) {
      const existingPerm = await permissionRepository.findOne({
        where: { name: permData.name }
      });

      if (!existingPerm) {
        const permission = permissionRepository.create(permData);
        await permissionRepository.save(permission);
        console.log(`  ✓ Created permission: ${permData.name}`);
      } else {
        console.log(`  ⏭Permission already exists: ${permData.name}`);
      }
    }

    // Create admin user
    console.log("Creating admin user...");
    const hashedPassword = await bcrypt.hash("admin123", 10);
    
    const adminUser = userRepository.create({
      username: "admin",
      fullName: "System Administrator",
      password: hashedPassword,
      phone: "1234567890",
      isActive: true,
      hourRate: 0,
    });

    await userRepository.save(adminUser);
    console.log("  ✓ Created admin user (username: admin, password: admin123)");
    console.log("   Please change the default password after first login!");

    // Assign OWNER_ACCESS permission to admin user
    console.log("Assigning OWNER_ACCESS permission to admin user...");
    const ownerAccessPermission = await permissionRepository.findOne({
      where: { name: "OWNER_ACCESS" }
    });

    if (ownerAccessPermission) {
      const userPermission = userPermissionRepository.create({
        user: adminUser,
        permission: ownerAccessPermission,
        granted_by: adminUser, // Self-granted for initial setup
        granted_at: new Date(),
        is_revoked: false
      });

      await userPermissionRepository.save(userPermission);
      console.log("  ✓ Assigned OWNER_ACCESS permission to admin user");
    } else {
      console.log("  ⚠ OWNER_ACCESS permission not found, skipping assignment");
    }

    console.log("Database seeding completed successfully");
    
  } catch (error) {
    console.error("Database seeding failed:", error);
    throw error;
  }
}

// Run seeding if this file is executed directly
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log("Seeding complete, exiting...");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Seeding failed:", error);
      process.exit(1);
    });
}

module.exports = { seedDatabase };
