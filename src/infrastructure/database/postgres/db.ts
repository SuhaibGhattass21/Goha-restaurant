import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

// Load environment variables first
dotenv.config();

// Import models after reflect-metadata and dotenv
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

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL || "",
  synchronize: process.env.NODE_ENV === "development",
  logging: process.env.NODE_ENV === "development",
  migrations: [
    process.env.NODE_ENV === "production"
      ? "dist/infrastructure/database/postgres/migrations/*.js"
      : "src/infrastructure/database/postgres/migrations/*.ts",
  ],
  entities: [
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
    User,
    Permissions,
    UserPermission,
    Worker,
    CancelledOrder,
    Expense,
  ],
  subscribers: [],
  migrationsRun: process.env.NODE_ENV === "production",
});
