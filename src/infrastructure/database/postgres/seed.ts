import "reflect-metadata";
import { DataSource } from "typeorm";
import {
  User,
  Permissions,
  UserPermission,
  Category,
  CategoryExtra,
  CategorySize,
  Product,
  ProductSizePrice,
  Shift,
  Worker,
  ShiftWorker,
  StockItem,
  StockTransaction,
  OrderItem,
  Order,
  CancelledOrder,
  OrderItemExtra,
  ExternalReceipt,
  Expense,
  Supplier,
  SupplierInvoice,
  SupplierPayment,
} from "../models";
import * as bcrypt from "bcrypt";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Create a separate DataSource for seeding with all entities to avoid metadata errors
const SeedDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL || "",
  synchronize: false,
  logging: process.env.NODE_ENV === "development" ? ["query", "error"] : ["error"],
  entities: [
    User,
    Permissions,
    UserPermission,
    Category,
    CategoryExtra,
    CategorySize,
    Product,
    ProductSizePrice,
    Shift,
    Worker,
    ShiftWorker,
    StockItem,
    StockTransaction,
    OrderItem,
    Order,
    CancelledOrder,
    OrderItemExtra,
    ExternalReceipt,
    Expense,
    Supplier,
    SupplierInvoice,
    SupplierPayment,
  ],
  extra: {
    connectionTimeoutMillis: 30000,
    idleTimeoutMillis: 30000,
    max: 20,
    ssl: process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: false } : false,
  },
});

export async function seedDatabase() {
  try {
    console.log("Starting database seeding...");

    if (!SeedDataSource.isInitialized) {
      await SeedDataSource.initialize();
    }

    const userRepository = SeedDataSource.getRepository(User);
    const permissionRepository = SeedDataSource.getRepository(Permissions);

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
    
    // Close the connection
    await SeedDataSource.destroy();
    
  } catch (error) {
    console.error("Database seeding failed:", error);
    // Make sure to close connection even on error
    if (SeedDataSource.isInitialized) {
      await SeedDataSource.destroy();
    }
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
