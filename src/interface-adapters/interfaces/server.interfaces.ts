import { AuthRoutes } from "../http/routes/auth.routes"
import { CategoryExtraRoutes } from "../http/routes/Category/category-extra.routes"
import { CategorySizeRoutes } from "../http/routes/Category/category-size.routes"
import { CategoryRoutes } from "../http/routes/Category/category.routes"
import { ProductSizePriceRoutes } from "../http/routes/Product/product-size-price.routes"
import { ProductRoutes } from "../http/routes/Product/product.routes"
import { ShiftRoutes } from "../http/routes/Shift/shift.routes"
import { UserRoutes } from "../http/routes/user.routes"
import { PermissionRoutes } from "../http/routes/permission.routes"
import { WorkerRoutes } from "../http/routes/Shift/worker.routes"
import { ShiftWorkerRoutes } from "../http/routes/Shift/shiftWorker.routes"
import { StockItemRoutes } from "../http/routes/Stock/stock-item.routes"
import { StockTransactionRoutes } from "../http/routes/Stock/stock-transaction.routes"
import { OrderRoutes } from "src/interface-adapters/http/routes/Orders/order.routes"
import { OrderItemRoutes } from "src/interface-adapters/http/routes/Orders/order-item.routes"
import { CancelledOrderRoutes } from "src/interface-adapters/http/routes/Orders/cancelled-order.routes"
import { ExternalReceiptRoutes } from "../http/routes/Orders/external-receipt.routes"
import { ExpenseRoutes } from "../http/routes/Shift/expense.routes"
import type { StockReportRoutes } from "../http/routes/Stock/stock-report.routes"
import { Router } from "express"
export interface AppDependencies {
  categoryRoutes: CategoryRoutes
  categoryExtraRoutes: CategoryExtraRoutes
  categorySizeRoutes: CategorySizeRoutes
  productRoutes: ProductRoutes
  productSizePriceRoutes: ProductSizePriceRoutes
  shiftRoutes: ShiftRoutes
  userRoutes: UserRoutes
  permissionRoutes: PermissionRoutes
  authRoutes: AuthRoutes
  workerRoutes: WorkerRoutes
  shiftWorkerRoutes: ShiftWorkerRoutes
  stockItemRoutes: StockItemRoutes
  stockTransactionRoutes: StockTransactionRoutes
  orderRoutes: OrderRoutes
  orderItemRoutes: OrderItemRoutes
  cancelledOrderRoutes: CancelledOrderRoutes
  externalReceiptRoutes: ExternalReceiptRoutes
  expenseRoutes: ExpenseRoutes
  stockReportRoutes: StockReportRoutes
  logsRoutes: Router
}
