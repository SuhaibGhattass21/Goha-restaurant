import type { AuthRoutes } from "../../routes/auth.routes"
import type { CategoryRoutes } from "../../routes/Category/category.routes"
import type { CategoryExtraRoutes } from "../../routes/Category/category-extra.routes"
import type { CategorySizeRoutes } from "../../routes/Category/category-size.routes"
import type { ProductRoutes } from "../../routes/Product/product.routes"
import type { ProductSizePriceRoutes } from "../../routes/Product/product-size-price.routes"
import type { UserRoutes } from "../../routes/user.routes"
import type { PermissionRoutes } from "../../routes/permission.routes"
import type { StockItemRoutes } from "../../routes/StockItem/stock-item.routes"

export interface AppDependencies {
  authRoutes: AuthRoutes
  categoryRoutes: CategoryRoutes
  categoryExtraRoutes: CategoryExtraRoutes
  categorySizeRoutes: CategorySizeRoutes
  productRoutes: ProductRoutes
  productSizePriceRoutes: ProductSizePriceRoutes
  userRoutes: UserRoutes
  permissionRoutes: PermissionRoutes
  stockItemRoutes: StockItemRoutes
}
