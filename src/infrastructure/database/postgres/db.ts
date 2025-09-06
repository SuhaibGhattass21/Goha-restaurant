import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
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

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL || "",
  synchronize: false, 
  logging: process.env.NODE_ENV === "development" ? ["query", "error"] : ["error"],
  // Always include both src (ts) and dist (js) so migrations are discovered whether
  // we run with ts-node or with compiled JS.
  migrations: [
    "src/infrastructure/database/postgres/migrations/*.{ts,js}",
    "dist/infrastructure/database/postgres/migrations/*.{ts,js}",
  ],
  // Keep runtime entities for dev via classes; production runtime uses compiled JS.
  entities: 
    process.env.NODE_ENV === "production"
      ? [
          "dist/infrastructure/database/models/*.js",
          // Also include src for ts-node-based tooling in production scripts (e.g., seeding)
          "src/infrastructure/database/models/*.ts",
        ]
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
  migrationsRun: false, 
  extra: {
    connectionTimeoutMillis: 30000,
    idleTimeoutMillis: 30000,
    max: 20,
    ssl: process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: false } : false,
  },
});
