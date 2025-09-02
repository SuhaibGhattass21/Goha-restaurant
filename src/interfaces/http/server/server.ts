import express from "express";
import "reflect-metadata";
import helmet from "helmet";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "../../config/swagger/swagger.config";
import { CategoryExtraController } from "../controllers/Category/category-extra.controller";
import { CategorySizeController } from "../controllers/Category/category-size.controller";
import { CategoryController } from "../controllers/Category/category.controller";
import { ProductSizePriceController } from "../controllers/Product/product-size-price.controller";
import { ProductController } from "../controllers/Product/product.controller";
import { ShiftController } from "../controllers/Shift/shift.controller";
import { WorkerController } from "../controllers/Shift/worker.controller";
import {
  notFoundHandler,
  errorHandler,
} from "../middlewares/error-handler.middleware";
import { CategoryExtraRoutes } from "../routes/Category/category-extra.routes";
import { CategorySizeRoutes } from "../routes/Category/category-size.routes";
import { CategoryRoutes } from "../routes/Category/category.routes";
import { ProductSizePriceRoutes } from "../routes/Product/product-size-price.routes";
import { ProductRoutes } from "../routes/Product/product.routes";
import { ShiftRoutes } from "../routes/Shift/shift.routes";
import { WorkerRoutes } from "../routes/Shift/worker.routes";
import { AppDependencies } from "./interfaces/server.interfaces";
import { AppDataSource } from "../../../infrastructure/database/postgres/db";
import { CategoryRepositoryImpl } from "../../../infrastructure/repositories/Category/category.repository.impl";
import { CategoryUseCases } from "../../../application/use-cases/Category/category.use-cases";
import { CategoryExtraRepositoryImpl } from "../../../infrastructure/repositories/Category/category-extra.repository";
import { CategoryExtraUseCases } from "../../../application/use-cases/Category/category-extra.use-cases";
import { CategorySizeRepositoryImpl } from "../../../infrastructure/repositories/Category/category-size.repository";
import { CategorySizeUseCases } from "../../../application/use-cases/Category/category-size.use-cases";
import { UserUseCases } from "../../../application/use-cases/user.use-case";
import { UserService } from "../../../domain/services/user.service";
import { ProductRepositoryImpl } from "../../../infrastructure/repositories/Product/product.repository.impl";
import { ProductUseCases } from "../../../application/use-cases/Product/product.use-cases";
import { ProductSizePriceRepositoryImpl } from "../../../infrastructure/repositories/Product/product-size-price.repository.impl";
import { ProductSizePriceUseCases } from "../../../application/use-cases/Product/product-size-price.use-cases";
import { ShiftRepositoryImpl } from "../../../infrastructure/repositories/Shift/shift.repository.impl";
import { ShiftUseCases } from "../../../application/use-cases/Shift/shift.use-case";
import { ShiftService } from "../../../domain/services/Shift/Shift.service";
import { PermissionRepositoryImpl } from "../../../infrastructure/repositories/permission.repository.impl";
import { PermissionUseCases } from "../../../application/use-cases/permission.use-case";
import { PermissionService } from "../../../domain/services/Permission.service";
import { PermissionController } from "../controllers/permission.controller";
import { PermissionRoutes } from "../routes/permission.routes";
import { StockItemRepositoryImpl } from "../../../infrastructure/repositories/Stock/stock-item.repository";
import { StockItemUseCases } from "../../../application/use-cases/Stock/stock-item.use-cases";
import { StockItemController } from "../controllers/Stock/stock-item.controller";
import { StockItemRoutes } from "../routes/Stock/stock-item.routes";
import { ShiftWorkerRepositoryImpl } from "../../../infrastructure/repositories/Shift/shiftWorker.repository.impl";
import { ShiftWorkerUseCase } from "../../../application/use-cases/Shift/shiftWorker.use-case";
import { ShiftWorkerService } from "../../../domain/services/Shift/ShiftWorker.service";
import { ShiftWorkerController } from "../controllers/Shift/shiftWorker.controller";
import { ShiftWorkerRoutes } from "../routes/Shift/shiftWorker.routes";
import { WorkerRepositoryImpl } from "../../../infrastructure/repositories/Shift/worker.repository.impl";
import { WorkerUseCases } from "../../../application/use-cases/Shift/worker.use-case";
import { WorkerService } from "../../../domain/services/Shift/Worker.service";
import { StockTransactionController } from "../controllers/Stock/stock-transaction.controller";
import { StockTransactionRoutes } from "../routes/Stock/stock-transaction.routes";
import { StockTransactionRepositoryImpl } from "../../../infrastructure/repositories/Stock/stock-transaction.repository.impl";
import { StockTransactionUseCases } from "../../../application/use-cases/Stock/stock-transaction.use-cases";
import { OrderController } from "../controllers/Orders/order.controller";
import { OrderRoutes } from "../routes/Orders/order.routes";
import { OrderRepositoryImpl } from "../../../infrastructure/repositories/Orders/order.repository.impl";
import { OrderUseCases } from "../../../application/use-cases/Orders/order.use-cases";
import { OrderItemController } from "../controllers/Orders/order-item.controller";
import { OrderItemRoutes } from "../routes/Orders/order-item.routes";
import { OrderItemRepositoryImpl } from "../../../infrastructure/repositories/Orders/order-item.repository.impl";
import { OrderItemExtraRepositoryImpl } from "../../../infrastructure/repositories/Orders/order-item-extra.repository.impl";
import { OrderItemUseCases } from "../../../application/use-cases/Orders/order-item.use-cases";
import { CancelledOrderController } from "../controllers/Orders/cancelled-order.controller";
import { CancelledOrderRoutes } from "../routes/Orders/cancelled-order.routes";
import { CancelledOrderRepositoryImpl } from "../../../infrastructure/repositories/Orders/cancelled-order.repository.impl";
import { CancelledOrderUseCases } from "../../../application/use-cases/Orders/cancelled-order.use-cases";
import { ExternalReceiptController } from "../controllers/Orders/external-receipt.controller";
import { ExternalReceiptRoutes } from "../routes/Orders/external-receipt.routes";
import { ExternalReceiptRepositoryImpl } from "../../../infrastructure/repositories/Orders/external-receipt.repository.impl";
import { ExternalReceiptUseCases } from "../../../application/use-cases/Orders/external-receipt.use-case";
import { ExpenseService } from "../../../domain/services/Shift/Expense.service";
import { ExpenseController } from "../controllers/Shift/expense.controller";
import { ExpenseRoutes } from "../routes/Shift/expense.routes";
import { ExpenseUseCases } from "../../../application/use-cases/Shift/expense.use-case";
import { ExpenseRepositoryImpl } from "../../../infrastructure/repositories/Shift/expense.repository.impl";
import {
  Category,
  CategoryExtra,
  CategorySize,
  Product,
  ProductSizePrice,
  Shift,
  Permissions,
  User,
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
  UserPermission,
} from "../../../infrastructure/database/models";
import { AuthController } from "../controllers/auth.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { AuthRoutes } from "../routes/auth.routes";
import { AuthUseCases } from "../../../application/use-cases/auth.use-case";
import { UserRepositoryImpl } from "../../../infrastructure/repositories/user.repository.impl";
import { UserController } from "../controllers/user.controller";
import { UserRoutes } from "../routes/user.routes";
import { StockReportController } from "../controllers/Stock/stock-report.controller";
import { StockReportRoutes } from "../routes/Stock/stock-report.routes";
import { StockReportRepositoryImpl } from "../../../infrastructure/repositories/Stock/stock-report.repository.impl";
import { StockReportUseCases } from "../../../application/use-cases/Stock/stock-report.use-cases";
import { AuthorizationMiddleware } from "../middlewares/authorization.middleware";
import { IUserRepository } from "@domain/repositories/user.repository.interface";
import rateLimit from "express-rate-limit";
export class Server {
  private app: express.Application;
  private readonly PORT: number;

  private setupSwagger(): void {
    this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  }
  constructor() {
    this.app = express();
    this.PORT = Number.parseInt(process.env.PORT || "3000", 10);
    this.setupMiddlewares();
    this.setupHealthCheck();
  }

  private setupMiddlewares(): void {
    this.app.use(helmet());

    this.app.use(
      cors({
        origin: process.env.ALLOWED_ORIGINS?.split(",") || "*",
        credentials: true,
      })
    );

    this.app.use(express.json({ limit: "10mb" }));
    this.app.use(express.urlencoded({ extended: true, limit: "10mb" }));

    this.app.use(rateLimit({
      windowMs: 15 * 60 * 1000,
      max: process.env.NODE_ENV === "production" ? 100 : 100000,
    }));
  }


  private setupHealthCheck(): void {
    this.app.get("/health", async (req, res) => {
      const db = await AppDataSource.query("select 1")
        .then(() => "connected")
        .catch(() => "disconnected");
      res
        .status(200)
        .json({
          status: "OK",
          message: "Goha Restaurant Cafe System is running",
          timestamp: new Date().toISOString(),
          database: db,
          version: process.env.npm_package_version || "1.0.0",
        });
    });
  }

  private initializeDependencies(): AppDependencies {
    try {
      // Validate AppDataSource is initialized
      if (!AppDataSource.isInitialized) {
        throw new Error("Database connection not initialized");
      }

      console.log("📦 Getting TypeORM repositories...");
      // Get TypeORM repositories
      const categoryRepo = AppDataSource.getRepository(Category);
      const categoryExtraRepo = AppDataSource.getRepository(CategoryExtra);
      const categorySizeRepo = AppDataSource.getRepository(CategorySize);
      const productRepo = AppDataSource.getRepository(Product);
      const productSizePriceRepo =
        AppDataSource.getRepository(ProductSizePrice);
      const stockItemRepo = AppDataSource.getRepository(StockItem);
      const shiftRepo = AppDataSource.getRepository(Shift);
      const permissionRepo = AppDataSource.getRepository(Permissions);
      const userPermissionRepo = AppDataSource.getRepository(UserPermission);
      const userRepo = AppDataSource.getRepository(User);
      const workerRepo = AppDataSource.getRepository(Worker);
      const shiftWorkerRepo = AppDataSource.getRepository(ShiftWorker);
      const stockTransactionRepo =
        AppDataSource.getRepository(StockTransaction);
      const orderItemRepo = AppDataSource.getRepository(OrderItem);
      const orderRepo = AppDataSource.getRepository(Order);
      const cancelledOrderRepo = AppDataSource.getRepository(CancelledOrder);
      const orderItemExtraRepo = AppDataSource.getRepository(OrderItemExtra);
      const externalReceiptRepo = AppDataSource.getRepository(ExternalReceipt);

      // Setup Category module
      const categoryRepository = new CategoryRepositoryImpl(categoryRepo);
      const categoryUseCases = new CategoryUseCases(categoryRepository);
      const categoryController = new CategoryController(categoryUseCases);
      const categoryRoutes = new CategoryRoutes(categoryController);

      // Setup CategoryExtra module
      const categoryExtraRepository = new CategoryExtraRepositoryImpl(
        categoryExtraRepo,
        categoryRepo
      );
      const categoryExtraUseCases = new CategoryExtraUseCases(
        categoryExtraRepository,
        categoryRepository
      );
      const categoryExtraController = new CategoryExtraController(
        categoryExtraUseCases
      );
      const categoryExtraRoutes = new CategoryExtraRoutes(
        categoryExtraController
      );

      // Setup CategorySize module
      const categorySizeRepository = new CategorySizeRepositoryImpl(
        categorySizeRepo,
        categoryRepo
      );
      const categorySizeUseCases = new CategorySizeUseCases(
        categorySizeRepository,
        categoryRepository
      );
      const categorySizeController = new CategorySizeController(
        categorySizeUseCases
      );
      const categorySizeRoutes = new CategorySizeRoutes(categorySizeController);

      // Setup Product module
      const productRepository = new ProductRepositoryImpl(productRepo);
      const productUseCases = new ProductUseCases(
        productRepository,
        categoryRepository
      );
      const productController = new ProductController(productUseCases);
      const productRoutes = new ProductRoutes(productController);

      // Setup ProductSizePrice module
      const productSizePriceRepository = new ProductSizePriceRepositoryImpl(
        productSizePriceRepo
      );
      const productSizePriceUseCases = new ProductSizePriceUseCases(
        productSizePriceRepository,
        productRepository,
        categorySizeRepository
      );
      const productSizePriceController = new ProductSizePriceController(
        productSizePriceUseCases
      );
      const productSizePriceRoutes = new ProductSizePriceRoutes(
        productSizePriceController
      );

      // Setup StockItem module
      const stockItemRepository = new StockItemRepositoryImpl(stockItemRepo);
      const stockItemUseCases = new StockItemUseCases(stockItemRepository);
      const stockItemController = new StockItemController(stockItemUseCases);
      const stockItemRoutes = new StockItemRoutes(stockItemController);

      // Setup StockTransaction module
      const stockTransactionRepository = new StockTransactionRepositoryImpl(
        stockTransactionRepo
      );
      const stockTransactionUseCases = new StockTransactionUseCases(
        stockTransactionRepository,
        stockItemRepository
      );
      const stockTransactionController = new StockTransactionController(
        stockTransactionUseCases
      );
      const stockTransactionRoutes = new StockTransactionRoutes(
        stockTransactionController
      );
      // Setup StockReport module

      const stockReportRepository = new StockReportRepositoryImpl(
        stockItemRepo,
        stockTransactionRepo,
        shiftRepo
      );
      const stockReportUseCases = new StockReportUseCases(
        stockReportRepository
      );
      const stockReportController = new StockReportController(
        stockReportUseCases
      );
      const stockReportRoutes = new StockReportRoutes(stockReportController);
      // Setup Shift module
      const shiftRepository = new ShiftRepositoryImpl(shiftRepo, userRepo);
      const shiftUseCases = new ShiftUseCases(shiftRepository);
      const shiftService = new ShiftService(shiftUseCases);
      const shiftController = new ShiftController(shiftService);
      const shiftRoutes = new ShiftRoutes(shiftController);

      // Setup User module
      const UserRepository = new UserRepositoryImpl(userRepo);
      const userUseCases = new UserUseCases(UserRepository);
      const userService = new UserService(userUseCases);
      const userController = new UserController(userService);
      const userRoutes = new UserRoutes(userController);

      // Setup Permission module
      const permissionRepository = new PermissionRepositoryImpl(
        permissionRepo,
        userPermissionRepo,
        userRepo
      );
      const permissionUseCases = new PermissionUseCases(permissionRepository);
      const permissionService = new PermissionService(permissionUseCases);
      const permissionController = new PermissionController(permissionService);
      const permissionRoutes = new PermissionRoutes(permissionController);

      // Setup Permission module
      const workerRepository = new WorkerRepositoryImpl(workerRepo);
      const workerUseCases = new WorkerUseCases(workerRepository);
      const workerService = new WorkerService(workerUseCases);
      const workerController = new WorkerController(workerService);
      const workerRoutes = new WorkerRoutes(workerController);

      // Setup User module
      if (!userRepo) {
        throw new Error("User repository is not properly initialized");
      }
      
      const userRepository = new UserRepositoryImpl(userRepo);
      console.log("✅ User repository created");
      
      const authUseCases = new AuthUseCases(userRepository);
      console.log("✅ Auth use cases created");
      
      const authController = new AuthController(authUseCases);
      console.log("✅ Auth controller created");
      
      const authRoutes = new AuthRoutes(authController);
      console.log("✅ Auth routes created");

      // Setup ShiftWorker module
      const shiftWorkerRepository = new ShiftWorkerRepositoryImpl(
        shiftWorkerRepo
      );
      const shiftWorkerUseCases = new ShiftWorkerUseCase(shiftWorkerRepository);
      const shiftWorkerService = new ShiftWorkerService(shiftWorkerUseCases);
      const shiftWorkerController = new ShiftWorkerController(
        shiftWorkerService
      );
      const shiftWorkerRoutes = new ShiftWorkerRoutes(shiftWorkerController);

      // Order module
      const orderRepository = new OrderRepositoryImpl(orderRepo);
      const orderItemRepository = new OrderItemRepositoryImpl(orderItemRepo);
      const orderItemExtraRepository = new OrderItemExtraRepositoryImpl(
        orderItemExtraRepo
      );
      const cancelledOrderRepository = new CancelledOrderRepositoryImpl(
        cancelledOrderRepo
      );
      const cancelledOrderUseCases = new CancelledOrderUseCases(
        cancelledOrderRepository,
        orderRepository
      );
      const orderUseCases = new OrderUseCases(
        orderRepository,
        orderItemRepository,
        orderItemExtraRepository,
        cancelledOrderUseCases
      );
      const orderController = new OrderController(
        orderUseCases,
        cancelledOrderUseCases
      );
      const orderRoutes = new OrderRoutes(orderController);
      const orderItemUseCases = new OrderItemUseCases(
        orderItemRepository,
        orderItemExtraRepository
      );
      const orderItemController = new OrderItemController(orderItemUseCases);
      const orderItemRoutes = new OrderItemRoutes(orderItemController);
      const cancelledOrderController = new CancelledOrderController(
        cancelledOrderUseCases,
        orderUseCases
      );
      const cancelledOrderRoutes = new CancelledOrderRoutes(
        cancelledOrderController
      );

      // External Receipt
      const externalReceiptRepository = new ExternalReceiptRepositoryImpl(
        externalReceiptRepo
      );
      const externalReceiptUseCases = new ExternalReceiptUseCases(
        externalReceiptRepository
      );
      const externalReceiptController = new ExternalReceiptController(
        externalReceiptUseCases
      );
      const externalReceiptRoutes = new ExternalReceiptRoutes(
        externalReceiptController
      );

      // Expense module
      const expenseRepository = new ExpenseRepositoryImpl(
        AppDataSource.getRepository(Expense)
      );
      const expenseUseCases = new ExpenseUseCases(expenseRepository);
      const expenseService = new ExpenseService(expenseUseCases);
      const expenseController = new ExpenseController(expenseService);
      const expenseRoutes = new ExpenseRoutes(expenseController);

      return {
        authRoutes,
        categoryRoutes,
        categoryExtraRoutes,
        categorySizeRoutes,
        productRoutes,
        productSizePriceRoutes,
        shiftRoutes,
        userRoutes,
        permissionRoutes,
        workerRoutes,
        shiftWorkerRoutes,
        stockItemRoutes,
        stockTransactionRoutes,
        orderRoutes,
        orderItemRoutes,
        cancelledOrderRoutes,
        externalReceiptRoutes,
        expenseRoutes,
        stockReportRoutes,
      };
    } catch (error) {
      console.error("Error initializing dependencies:", error);
      throw new Error(
        `Failed to initialize application dependencies: ${error}`
      );
    }
  }

  private setupRoutes(dependencies: AppDependencies): void {
    // API routes with versioning
    const apiV1 = express.Router();

    apiV1.use("/auth", dependencies.authRoutes.getRouter());
    apiV1.use(
      "/categories",
      AuthMiddleware.authenticate(),
      dependencies.categoryRoutes.getRouter()
    );
    apiV1.use(
      "/category-extras",
      AuthMiddleware.authenticate(),
      dependencies.categoryExtraRoutes.getRouter()
    );
    apiV1.use(
      "/category-sizes",
      AuthMiddleware.authenticate(),
      dependencies.categorySizeRoutes.getRouter()
    );
    apiV1.use(
      "/products",
      AuthMiddleware.authenticate(),
      dependencies.productRoutes.getRouter()
    );
    apiV1.use(
      "/product-size-prices",
      AuthMiddleware.authenticate(),
      dependencies.productSizePriceRoutes.getRouter()
    );
    apiV1.use(
      "/shifts",
      AuthMiddleware.authenticate(),
      dependencies.shiftRoutes.getRouter()
    );
    apiV1.use(
      "/workers",
      AuthMiddleware.authenticate(),
      dependencies.workerRoutes.getRouter()
    );
    apiV1.use(
      "/users",
      AuthMiddleware.authenticate(),
      AuthorizationMiddleware.requireAnyPermission([
        "OWNER_ACCESS",
        "access:users",
      ]),
      dependencies.userRoutes.getRouter()
    );
    apiV1.use(
      "/permissions",
      AuthMiddleware.authenticate(),
      // AuthorizationMiddleware.requireAnyPermission([
      //   "OWNER_ACCESS",
      //   "access:permissions",
      // ]),
      dependencies.permissionRoutes.getRouter()
    );
    apiV1.use(
      "/shift-workers",
      AuthMiddleware.authenticate(),
      AuthorizationMiddleware.requireAnyPermission([
        "OWNER_ACCESS",
        "access:cashier",
      ]),
      dependencies.shiftWorkerRoutes.getRouter()
    );
    apiV1.use(
      "/stock-items",
      AuthMiddleware.authenticate(),
      dependencies.stockItemRoutes.getRouter()
    );
    apiV1.use(
      "/stock-transactions",
      AuthMiddleware.authenticate(),
      dependencies.stockTransactionRoutes.getRouter()
    );
    apiV1.use(
      "/stock-reports",
      AuthMiddleware.authenticate(),
      AuthorizationMiddleware.requireAnyPermission([
        "OWNER_ACCESS",
        "access:stock",
      ]),
      dependencies.stockReportRoutes.getRouter()
    );
    apiV1.use(
      "/orders",
      AuthMiddleware.authenticate(),
      dependencies.orderRoutes.getRouter()
    );
    apiV1.use(
      "/order-items",
      AuthMiddleware.authenticate(),
      AuthorizationMiddleware.requireAnyPermission([
        "OWNER_ACCESS",
        "access:cashier",
      ]),
      dependencies.orderItemRoutes.getRouter()
    );
    apiV1.use(
      "/cancelled-orders",
      AuthMiddleware.authenticate(),
      AuthorizationMiddleware.requireAnyPermission([
        "OWNER_ACCESS",
        "access:orders",
        "access:cashier",
      ]),
      dependencies.cancelledOrderRoutes.getRouter()
    );
    apiV1.use(
      "/external-receipts",
      AuthMiddleware.authenticate(),
      AuthorizationMiddleware.requireAnyPermission([
        "OWNER_ACCESS",
        "access:cashier",
      ]),
      dependencies.externalReceiptRoutes.getRouter()
    );
    apiV1.use(
      "/expenses",
      AuthMiddleware.authenticate(),
      AuthorizationMiddleware.requireAnyPermission([
        "OWNER_ACCESS",
        "access:cashier",
        "access:expenses",
      ]),
      dependencies.expenseRoutes.getRouter()
    );

    this.app.use("/api/v1", apiV1);
  }

  private setupErrorHandlers(): void {
    this.app.use(notFoundHandler);
    this.app.use(errorHandler);
  }

  private gracefulShutdown(): void {
    process.on("SIGTERM", async () => {
      console.log("SIGTERM received, shutting down gracefully...");
      await this.shutdown();
    });

    process.on("SIGINT", async () => {
      console.log("SIGINT received, shutting down gracefully...");
      await this.shutdown();
    });
  }

  private async shutdown(): Promise<void> {
    try {
      console.log("Closing database connection...");
      await AppDataSource.destroy();
      console.log("Database connection closed.");
      process.exit(0);
    } catch (error) {
      console.error("Error during shutdown:", error);
      process.exit(1);
    }
  }

  public async start(): Promise<void> {
    try {
      // Validate environment variables
      if (!process.env.DATABASE_URL) {
        console.warn("⚠️ DATABASE_URL not set, using default connection settings");
      }
      
      console.log("🔗 Initializing database connection...");
      await AppDataSource.initialize();
      console.log("✅ Database connected successfully");

      // Test database connectivity
      try {
        await AppDataSource.query("SELECT 1");
        console.log("✅ Database connectivity test passed");
      } catch (dbError) {
        console.error("❌ Database connectivity test failed:", dbError);
        throw dbError;
      }

      console.log("🏗️ Initializing application dependencies...");
      const dependencies = this.initializeDependencies();
      console.log("✅ Application dependencies initialized");

      this.setupSwagger();
      this.setupRoutes(dependencies);
      console.log("✅ Routes configured");

      this.setupErrorHandlers();
      this.gracefulShutdown();

      this.app.listen(this.PORT, () => {
        console.log(
          `Goha Restaurant Cafe System running at: http://localhost:${this.PORT}`
        );
        console.log(`Swagger: http://localhost:${this.PORT}/api-docs`);
        console.log(`Health: http://localhost:${this.PORT}/health`);
      });
    } catch (error) {
      console.error("Failed to start application:", error);
      await this.shutdown();
    }
  }
}
