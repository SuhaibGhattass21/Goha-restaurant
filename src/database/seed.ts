import { AppDataSource } from "../infrastructure/database/postgres/db";
import { User, Permissions } from "../infrastructure/database/models";
import * as bcrypt from "bcrypt";

export async function seedDatabase() {
  try {
    console.log("Starting database seeding...");

    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const userRepository = AppDataSource.getRepository(User);
    const permissionRepository = AppDataSource.getRepository(Permissions);

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
      { name: "access:stock", description: "Access to stock management" },
      { name: "access:orders", description: "Access to order management" },
      { name: "access:expenses", description: "Access to expense management" },
      { name: "access:reports", description: "Access to reports" },
      { name: "access:logs", description: "Access to logs" },
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
