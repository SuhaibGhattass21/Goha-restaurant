import { AuthRoutes } from "../../routes/auth.routes"
import { CategoryExtraRoutes } from "../../routes/Category/category-extra.routes"
import { CategorySizeRoutes } from "../../routes/Category/category-size.routes"
import { CategoryRoutes } from "../../routes/Category/category.routes"
import { ProductSizePriceRoutes } from "../../routes/Product/product-size-price.routes"
import { ProductRoutes } from "../../routes/Product/product.routes"
import { ShiftRoutes } from "../../routes/Shift/shift.routes"
import { UserRoutes } from "../../routes/user.routes"
import { PermissionRoutes } from "../../routes/permission.routes"
import { WorkerRoutes } from "../../routes/Shift/worker.routes"
import { ShiftWorkerRoutes } from "../../routes/Shift/shiftWorker.routes"
import { StockItemRoutes } from "../../routes/Stock/stock-item.routes"
import { StockTransactionRoutes } from "../../routes/Stock/stock-transaction.routes"
import { OrderRoutes } from "@interfaces/http/routes/Orders/order.routes"
import { OrderItemRoutes } from "@interfaces/http/routes/Orders/order-item.routes"
import { CancelledOrderRoutes } from "@interfaces/http/routes/Orders/cancelled-order.routes"
import { ExternalReceiptRoutes } from "../../routes/Orders/external-receipt.routes"

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
}
