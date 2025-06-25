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
import type { StockItemRoutes } from "../../routes/StockItem/stock-item.routes"
import type { StockTransactionRoutes } from "../../routes/StockTransaction/stock-transaction.routes"


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
}
