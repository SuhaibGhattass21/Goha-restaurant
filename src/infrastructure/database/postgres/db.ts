import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { ProductionSafetyChecker } from "./production-safety";
import {
  Category,
  CategoryExtra,
  CategorySize,
  ExternalReceipt,
  Order,
  OrderItem,
  OrderItemExtra,
  Product,
  ProductSizePrice,
  Shift,
  ShiftWorker,
  StockItem,
  StockTransaction,
  Supplier,
  SupplierInvoice,
  SupplierPayment,
  User,
  Permissions,
  UserPermission,
  Worker,
  CancelledOrder,
  Expense,
} from "../models";

dotenv.config();

// Verify production safety before creating DataSource
ProductionSafetyChecker.verifyProductionSafety();

// Use only compiled JS files for entities and migrations in production
export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL || "",
  // Use production safety configuration
  ...ProductionSafetyChecker.getSafeProductionConfig(),
  logging: process.env.NODE_ENV === "development" ? ["query", "error"] : ["error"],
  migrations: process.env.NODE_ENV === "production"
    ? ["dist/infrastructure/database/postgres/migrations/*.js"]
    : ["src/infrastructure/database/postgres/migrations/*.ts"],
  entities: process.env.NODE_ENV === "production"
    ? ["dist/infrastructure/database/models/*.js"]
    : [
        User,
        Product,
        Category,
        CategorySize,
        ProductSizePrice,
        CategoryExtra,
        Order,
        OrderItem,
        Shift,
        StockItem,
        StockTransaction,
        OrderItemExtra,
        ShiftWorker,
        Supplier,
        SupplierInvoice,
        SupplierPayment,
        ExternalReceipt,
        Permissions,
        UserPermission,
        Worker,
        CancelledOrder,
        Expense,
      ],
  subscribers: [],
  extra: {
    connectionTimeoutMillis: 30000,
    idleTimeoutMillis: 30000,
    max: 20,
    ssl: process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: false } : false,
  },
});
