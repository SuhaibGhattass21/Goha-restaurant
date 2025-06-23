import type { AuthRoutes } from "../../routes/auth.routes"
import type { CategoryExtraRoutes } from "../../routes/Category/category-extra.routes"
import type { CategorySizeRoutes } from "../../routes/Category/category-size.routes"
import type { CategoryRoutes } from "../../routes/Category/category.routes"
import type { ProductSizePriceRoutes } from "../../routes/Product/product-size-price.routes"
import type { ProductRoutes } from "../../routes/Product/product.routes"
import type { ShiftRoutes } from "../../routes/Shift/shift.routes"
import type { UserRoutes } from "../../routes/user.routes"
import type { PermissionRoutes } from "../../routes/permission.routes"
import type { OrderItemRoutes } from "../../routes/Orders/order-item.routes"
import type { OrderRoutes } from "../../routes/Orders/order.routes"
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
  orderItemRoutes: OrderItemRoutes
orderRoutes: OrderRoutes
}
