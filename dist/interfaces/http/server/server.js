"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_config_1 = require("../../config/swagger/swagger.config");
const category_extra_controller_1 = require("../controllers/Category/category-extra.controller");
const category_size_controller_1 = require("../controllers/Category/category-size.controller");
const category_controller_1 = require("../controllers/Category/category.controller");
const product_size_price_controller_1 = require("../controllers/Product/product-size-price.controller");
const product_controller_1 = require("../controllers/Product/product.controller");
const shift_controller_1 = require("../controllers/Shift/shift.controller");
const worker_controller_1 = require("../controllers/Shift/worker.controller");
const error_handler_middleware_1 = require("../middlewares/error-handler.middleware");
const category_extra_routes_1 = require("../routes/Category/category-extra.routes");
const category_size_routes_1 = require("../routes/Category/category-size.routes");
const category_routes_1 = require("../routes/Category/category.routes");
const product_size_price_routes_1 = require("../routes/Product/product-size-price.routes");
const product_routes_1 = require("../routes/Product/product.routes");
const shift_routes_1 = require("../routes/Shift/shift.routes");
const worker_routes_1 = require("../routes/Shift/worker.routes");
const db_1 = require("../../../infrastructure/database/postgres/db");
const category_repository_impl_1 = require("../../../infrastructure/repositories/Category/category.repository.impl");
const category_use_cases_1 = require("../../../application/use-cases/Category/category.use-cases");
const category_extra_repository_1 = require("../../../infrastructure/repositories/Category/category-extra.repository");
const category_extra_use_cases_1 = require("../../../application/use-cases/Category/category-extra.use-cases");
const category_size_repository_1 = require("../../../infrastructure/repositories/Category/category-size.repository");
const category_size_use_cases_1 = require("../../../application/use-cases/Category/category-size.use-cases");
const user_use_case_1 = require("../../../application/use-cases/user.use-case");
const user_service_1 = require("../../../domain/services/user.service");
const product_repository_impl_1 = require("../../../infrastructure/repositories/Product/product.repository.impl");
const product_use_cases_1 = require("../../../application/use-cases/Product/product.use-cases");
const product_size_price_repository_impl_1 = require("../../../infrastructure/repositories/Product/product-size-price.repository.impl");
const product_size_price_use_cases_1 = require("../../../application/use-cases/Product/product-size-price.use-cases");
const shift_repository_impl_1 = require("../../../infrastructure/repositories/Shift/shift.repository.impl");
const shift_use_case_1 = require("../../../application/use-cases/Shift/shift.use-case");
const Shift_service_1 = require("../../../domain/services/Shift/Shift.service");
const permission_repository_impl_1 = require("../../../infrastructure/repositories/permission.repository.impl");
const permission_use_case_1 = require("../../../application/use-cases/permission.use-case");
const Permission_service_1 = require("../../../domain/services/Permission.service");
const permission_controller_1 = require("../controllers/permission.controller");
const permission_routes_1 = require("../routes/permission.routes");
const stock_item_repository_1 = require("../../../infrastructure/repositories/Stock/stock-item.repository");
const stock_item_use_cases_1 = require("../../../application/use-cases/Stock/stock-item.use-cases");
const stock_item_controller_1 = require("../controllers/Stock/stock-item.controller");
const stock_item_routes_1 = require("../routes/Stock/stock-item.routes");
const shiftWorker_repository_impl_1 = require("../../../infrastructure/repositories/Shift/shiftWorker.repository.impl");
const shiftWorker_use_case_1 = require("../../../application/use-cases/Shift/shiftWorker.use-case");
const ShiftWorker_service_1 = require("../../../domain/services/Shift/ShiftWorker.service");
const shiftWorker_controller_1 = require("../controllers/Shift/shiftWorker.controller");
const shiftWorker_routes_1 = require("../routes/Shift/shiftWorker.routes");
const worker_repository_impl_1 = require("../../../infrastructure/repositories/Shift/worker.repository.impl");
const worker_use_case_1 = require("../../../application/use-cases/Shift/worker.use-case");
const Worker_service_1 = require("../../../domain/services/Shift/Worker.service");
const stock_transaction_controller_1 = require("../controllers/Stock/stock-transaction.controller");
const stock_transaction_routes_1 = require("../routes/Stock/stock-transaction.routes");
const stock_transaction_repository_impl_1 = require("../../../infrastructure/repositories/Stock/stock-transaction.repository.impl");
const stock_transaction_use_cases_1 = require("../../../application/use-cases/Stock/stock-transaction.use-cases");
const order_controller_1 = require("../controllers/Orders/order.controller");
const order_routes_1 = require("../routes/Orders/order.routes");
const order_repository_impl_1 = require("../../../infrastructure/repositories/Orders/order.repository.impl");
const order_use_cases_1 = require("../../../application/use-cases/Orders/order.use-cases");
const order_item_controller_1 = require("../controllers/Orders/order-item.controller");
const order_item_routes_1 = require("../routes/Orders/order-item.routes");
const order_item_repository_impl_1 = require("../../../infrastructure/repositories/Orders/order-item.repository.impl");
const order_item_extra_repository_impl_1 = require("../../../infrastructure/repositories/Orders/order-item-extra.repository.impl");
const order_item_use_cases_1 = require("../../../application/use-cases/Orders/order-item.use-cases");
const cancelled_order_controller_1 = require("../controllers/Orders/cancelled-order.controller");
const cancelled_order_routes_1 = require("../routes/Orders/cancelled-order.routes");
const cancelled_order_repository_impl_1 = require("../../../infrastructure/repositories/Orders/cancelled-order.repository.impl");
const cancelled_order_use_cases_1 = require("../../../application/use-cases/Orders/cancelled-order.use-cases");
const external_receipt_controller_1 = require("../controllers/Orders/external-receipt.controller");
const external_receipt_routes_1 = require("../routes/Orders/external-receipt.routes");
const external_receipt_repository_impl_1 = require("../../../infrastructure/repositories/Orders/external-receipt.repository.impl");
const external_receipt_use_case_1 = require("../../../application/use-cases/Orders/external-receipt.use-case");
const Expense_service_1 = require("../../../domain/services/Shift/Expense.service");
const expense_controller_1 = require("../controllers/Shift/expense.controller");
const expense_routes_1 = require("../routes/Shift/expense.routes");
const expense_use_case_1 = require("../../../application/use-cases/Shift/expense.use-case");
const expense_repository_impl_1 = require("../../../infrastructure/repositories/Shift/expense.repository.impl");
const models_1 = require("../../../infrastructure/database/models");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const auth_routes_1 = require("../routes/auth.routes");
const auth_use_case_1 = require("../../../application/use-cases/auth.use-case");
const user_repository_impl_1 = require("../../../infrastructure/repositories/user.repository.impl");
const user_controller_1 = require("../controllers/user.controller");
const user_routes_1 = require("../routes/user.routes");
class Server {
    setupSwagger() {
        this.app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_config_1.swaggerSpec));
    }
    constructor() {
        this.app = (0, express_1.default)();
        this.PORT = Number.parseInt(process.env.PORT || "3000", 10);
        this.setupMiddlewares();
        this.setupHealthCheck();
    }
    setupMiddlewares() {
        this.app.use((0, helmet_1.default)());
        this.app.use((0, cors_1.default)({
            origin: process.env.ALLOWED_ORIGINS?.split(",") || "*",
            credentials: true,
        }));
        this.app.use(express_1.default.json({ limit: "10mb" }));
        this.app.use(express_1.default.urlencoded({ extended: true, limit: "10mb" }));
    }
    setupHealthCheck() {
        this.app.get("/health", (req, res) => {
            res.status(200).json({
                status: "OK",
                message: "Goha Restaurant Cafe System is running",
                timestamp: new Date().toISOString(),
                database: "connected",
                version: process.env.npm_package_version || "1.0.0",
            });
        });
    }
    initializeDependencies() {
        try {
            // Get TypeORM repositories
            const categoryRepo = db_1.AppDataSource.getRepository(models_1.Category);
            const categoryExtraRepo = db_1.AppDataSource.getRepository(models_1.CategoryExtra);
            const categorySizeRepo = db_1.AppDataSource.getRepository(models_1.CategorySize);
            const productRepo = db_1.AppDataSource.getRepository(models_1.Product);
            const productSizePriceRepo = db_1.AppDataSource.getRepository(models_1.ProductSizePrice);
            const stockItemRepo = db_1.AppDataSource.getRepository(models_1.StockItem);
            const shiftRepo = db_1.AppDataSource.getRepository(models_1.Shift);
            const permissionRepo = db_1.AppDataSource.getRepository(models_1.Permissions);
            const userPermissionRepo = db_1.AppDataSource.getRepository(models_1.UserPermission);
            const userRepo = db_1.AppDataSource.getRepository(models_1.User);
            const workerRepo = db_1.AppDataSource.getRepository(models_1.Worker);
            const shiftWorkerRepo = db_1.AppDataSource.getRepository(models_1.ShiftWorker);
            const stockTransactionRepo = db_1.AppDataSource.getRepository(models_1.StockTransaction);
            const orderItemRepo = db_1.AppDataSource.getRepository(models_1.OrderItem);
            const orderRepo = db_1.AppDataSource.getRepository(models_1.Order);
            const cancelledOrderRepo = db_1.AppDataSource.getRepository(models_1.CancelledOrder);
            const orderItemExtraRepo = db_1.AppDataSource.getRepository(models_1.OrderItemExtra);
            const externalReceiptRepo = db_1.AppDataSource.getRepository(models_1.ExternalReceipt);
            // Setup Category module
            const categoryRepository = new category_repository_impl_1.CategoryRepositoryImpl(categoryRepo);
            const categoryUseCases = new category_use_cases_1.CategoryUseCases(categoryRepository);
            const categoryController = new category_controller_1.CategoryController(categoryUseCases);
            const categoryRoutes = new category_routes_1.CategoryRoutes(categoryController);
            // Setup CategoryExtra module
            const categoryExtraRepository = new category_extra_repository_1.CategoryExtraRepositoryImpl(categoryExtraRepo, categoryRepo);
            const categoryExtraUseCases = new category_extra_use_cases_1.CategoryExtraUseCases(categoryExtraRepository, categoryRepository);
            const categoryExtraController = new category_extra_controller_1.CategoryExtraController(categoryExtraUseCases);
            const categoryExtraRoutes = new category_extra_routes_1.CategoryExtraRoutes(categoryExtraController);
            // Setup CategorySize module
            const categorySizeRepository = new category_size_repository_1.CategorySizeRepositoryImpl(categorySizeRepo, categoryRepo);
            const categorySizeUseCases = new category_size_use_cases_1.CategorySizeUseCases(categorySizeRepository, categoryRepository);
            const categorySizeController = new category_size_controller_1.CategorySizeController(categorySizeUseCases);
            const categorySizeRoutes = new category_size_routes_1.CategorySizeRoutes(categorySizeController);
            // Setup Product module
            const productRepository = new product_repository_impl_1.ProductRepositoryImpl(productRepo);
            const productUseCases = new product_use_cases_1.ProductUseCases(productRepository, categoryRepository);
            const productController = new product_controller_1.ProductController(productUseCases);
            const productRoutes = new product_routes_1.ProductRoutes(productController);
            // Setup ProductSizePrice module
            const productSizePriceRepository = new product_size_price_repository_impl_1.ProductSizePriceRepositoryImpl(productSizePriceRepo);
            const productSizePriceUseCases = new product_size_price_use_cases_1.ProductSizePriceUseCases(productSizePriceRepository, productRepository, categorySizeRepository);
            const productSizePriceController = new product_size_price_controller_1.ProductSizePriceController(productSizePriceUseCases);
            const productSizePriceRoutes = new product_size_price_routes_1.ProductSizePriceRoutes(productSizePriceController);
            // Setup StockItem module
            const stockItemRepository = new stock_item_repository_1.StockItemRepositoryImpl(stockItemRepo);
            const stockItemUseCases = new stock_item_use_cases_1.StockItemUseCases(stockItemRepository);
            const stockItemController = new stock_item_controller_1.StockItemController(stockItemUseCases);
            const stockItemRoutes = new stock_item_routes_1.StockItemRoutes(stockItemController);
            // Setup StockTransaction module
            const stockTransactionRepository = new stock_transaction_repository_impl_1.StockTransactionRepositoryImpl(stockTransactionRepo);
            const stockTransactionUseCases = new stock_transaction_use_cases_1.StockTransactionUseCases(stockTransactionRepository, stockItemRepository);
            const stockTransactionController = new stock_transaction_controller_1.StockTransactionController(stockTransactionUseCases);
            const stockTransactionRoutes = new stock_transaction_routes_1.StockTransactionRoutes(stockTransactionController);
            // Setup Shift module
            const shiftRepository = new shift_repository_impl_1.ShiftRepositoryImpl(shiftRepo);
            const shiftUseCases = new shift_use_case_1.ShiftUseCases(shiftRepository);
            const shiftService = new Shift_service_1.ShiftService(shiftUseCases);
            const shiftController = new shift_controller_1.ShiftController(shiftService);
            const shiftRoutes = new shift_routes_1.ShiftRoutes(shiftController);
            // Setup User module
            const UserRepository = new user_repository_impl_1.UserRepositoryImpl(userRepo);
            const userUseCases = new user_use_case_1.UserUseCases(UserRepository);
            const userService = new user_service_1.UserService(userUseCases);
            const userController = new user_controller_1.UserController(userService);
            const userRoutes = new user_routes_1.UserRoutes(userController);
            // Setup Permission module
            const permissionRepository = new permission_repository_impl_1.PermissionRepositoryImpl(permissionRepo, userPermissionRepo, userRepo);
            const permissionUseCases = new permission_use_case_1.PermissionUseCases(permissionRepository);
            const permissionService = new Permission_service_1.PermissionService(permissionUseCases);
            const permissionController = new permission_controller_1.PermissionController(permissionService);
            const permissionRoutes = new permission_routes_1.PermissionRoutes(permissionController);
            // Setup Permission module
            const workerRepository = new worker_repository_impl_1.WorkerRepositoryImpl(workerRepo);
            const workerUseCases = new worker_use_case_1.WorkerUseCases(workerRepository);
            const workerService = new Worker_service_1.WorkerService(workerUseCases);
            const workerController = new worker_controller_1.WorkerController(workerService);
            const workerRoutes = new worker_routes_1.WorkerRoutes(workerController);
            // Setup User module
            const userRepository = new user_repository_impl_1.UserRepositoryImpl(userRepo);
            const authUseCases = new auth_use_case_1.AuthUseCases(userRepository);
            const authController = new auth_controller_1.AuthController(authUseCases);
            const authMiddleware = new auth_middleware_1.AuthMiddleware(authUseCases);
            const authRoutes = new auth_routes_1.AuthRoutes(authController, authMiddleware);
            // Setup ShiftWorker module
            const shiftWorkerRepository = new shiftWorker_repository_impl_1.ShiftWorkerRepositoryImpl(shiftWorkerRepo);
            const shiftWorkerUseCases = new shiftWorker_use_case_1.ShiftWorkerUseCase(shiftWorkerRepository);
            const shiftWorkerService = new ShiftWorker_service_1.ShiftWorkerService(shiftWorkerUseCases);
            const shiftWorkerController = new shiftWorker_controller_1.ShiftWorkerController(shiftWorkerService);
            const shiftWorkerRoutes = new shiftWorker_routes_1.ShiftWorkerRoutes(shiftWorkerController);
            // Order module
            const orderRepository = new order_repository_impl_1.OrderRepositoryImpl(orderRepo);
            const orderItemRepository = new order_item_repository_impl_1.OrderItemRepositoryImpl(orderItemRepo);
            const orderItemExtraRepository = new order_item_extra_repository_impl_1.OrderItemExtraRepositoryImpl(orderItemExtraRepo);
            const cancelledOrderRepository = new cancelled_order_repository_impl_1.CancelledOrderRepositoryImpl(cancelledOrderRepo);
            const cancelledOrderUseCases = new cancelled_order_use_cases_1.CancelledOrderUseCases(cancelledOrderRepository);
            const orderUseCases = new order_use_cases_1.OrderUseCases(orderRepository, orderItemRepository, orderItemExtraRepository, cancelledOrderUseCases);
            const orderController = new order_controller_1.OrderController(orderUseCases);
            const orderRoutes = new order_routes_1.OrderRoutes(orderController);
            const orderItemUseCases = new order_item_use_cases_1.OrderItemUseCases(orderItemRepository, orderItemExtraRepository);
            const orderItemController = new order_item_controller_1.OrderItemController(orderItemUseCases);
            const orderItemRoutes = new order_item_routes_1.OrderItemRoutes(orderItemController);
            const cancelledOrderController = new cancelled_order_controller_1.CancelledOrderController(cancelledOrderUseCases);
            const cancelledOrderRoutes = new cancelled_order_routes_1.CancelledOrderRoutes(cancelledOrderController);
            // External Receipt
            const externalReceiptRepository = new external_receipt_repository_impl_1.ExternalReceiptRepositoryImpl(externalReceiptRepo);
            const externalReceiptUseCases = new external_receipt_use_case_1.ExternalReceiptUseCases(externalReceiptRepository);
            const externalReceiptController = new external_receipt_controller_1.ExternalReceiptController(externalReceiptUseCases);
            const externalReceiptRoutes = new external_receipt_routes_1.ExternalReceiptRoutes(externalReceiptController);
            // Expense module
            const expenseRepository = new expense_repository_impl_1.ExpenseRepositoryImpl(db_1.AppDataSource.getRepository(models_1.Expense));
            const expenseUseCases = new expense_use_case_1.ExpenseUseCases(expenseRepository);
            const expenseService = new Expense_service_1.ExpenseService(expenseUseCases);
            const expenseController = new expense_controller_1.ExpenseController(expenseService);
            const expenseRoutes = new expense_routes_1.ExpenseRoutes(expenseController);
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
                expenseRoutes
            };
        }
        catch (error) {
            console.error("Error initializing dependencies:", error);
            throw new Error(`Failed to initialize application dependencies: ${error}`);
        }
    }
    setupRoutes(dependencies) {
        // API routes with versioning
        const apiV1 = express_1.default.Router();
        apiV1.use("/auth", dependencies.authRoutes.getRouter());
        apiV1.use("/categories", dependencies.categoryRoutes.getRouter());
        apiV1.use("/category-extras", dependencies.categoryExtraRoutes.getRouter());
        apiV1.use("/category-sizes", dependencies.categorySizeRoutes.getRouter());
        apiV1.use("/products", dependencies.productRoutes.getRouter());
        apiV1.use("/product-size-prices", dependencies.productSizePriceRoutes.getRouter());
        apiV1.use("/shifts", dependencies.shiftRoutes.getRouter());
        apiV1.use("/workers", dependencies.workerRoutes.getRouter());
        apiV1.use("/users", dependencies.userRoutes.getRouter());
        apiV1.use("/permissions", dependencies.permissionRoutes.getRouter());
        apiV1.use("/shift-workers", dependencies.shiftWorkerRoutes.getRouter());
        apiV1.use("/stock-items", dependencies.stockItemRoutes.getRouter());
        apiV1.use("/stock-transactions", dependencies.stockTransactionRoutes.getRouter());
        apiV1.use("/orders", dependencies.orderRoutes.getRouter());
        apiV1.use("/order-items", dependencies.orderItemRoutes.getRouter());
        apiV1.use("/cancelled-orders", dependencies.cancelledOrderRoutes.getRouter());
        apiV1.use("/external-receipts", dependencies.externalReceiptRoutes.getRouter());
        this.app.use("/api/v1", apiV1);
        this.app.use("/api/v1", apiV1);
        // Backward compatibility
        this.app.use("/api", apiV1);
    }
    setupErrorHandlers() {
        this.app.use(error_handler_middleware_1.notFoundHandler);
        this.app.use(error_handler_middleware_1.errorHandler);
    }
    gracefulShutdown() {
        process.on("SIGTERM", async () => {
            console.log("SIGTERM received, shutting down gracefully...");
            await this.shutdown();
        });
        process.on("SIGINT", async () => {
            console.log("SIGINT received, shutting down gracefully...");
            await this.shutdown();
        });
    }
    async shutdown() {
        try {
            console.log("Closing database connection...");
            await db_1.AppDataSource.destroy();
            console.log("Database connection closed.");
            process.exit(0);
        }
        catch (error) {
            console.error("Error during shutdown:", error);
            process.exit(1);
        }
    }
    async start() {
        try {
            await db_1.AppDataSource.initialize();
            console.log("✅ Database connected successfully");
            const dependencies = this.initializeDependencies();
            console.log("✅ Application dependencies initialized");
            this.setupSwagger();
            this.setupRoutes(dependencies);
            console.log("✅ Routes configured");
            this.setupErrorHandlers();
            this.gracefulShutdown();
            this.app.listen(this.PORT, () => {
                console.log(`Goha Restaurant Cafe System running at: http://localhost:${this.PORT}`);
                console.log(`Swagger: http://localhost:${this.PORT}/api-docs`);
                console.log(`Health: http://localhost:${this.PORT}/health`);
            });
        }
        catch (error) {
            console.error("Failed to start application:", error);
            await this.shutdown();
        }
    }
}
exports.Server = Server;
/*
import { AppDataSource } from './infrastructure/database/postgres/db';

async function testConnection() {
    try {
        await AppDataSource.initialize();
        console.log('✅ Database connection successful!');
        console.log('Database:', AppDataSource.options.database);
        console.log('Host:', AppDataSource.options.host);
        await AppDataSource.destroy();
    } catch (error) {
        console.error('❌ Database connection failed:', error);
    }
}


*/
//# sourceMappingURL=server.js.map