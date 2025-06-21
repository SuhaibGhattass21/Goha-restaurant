import { CategoryExtraRoutes } from "@interfaces/http/routes/category-extra.routes"
import { CategorySizeRoutes } from "@interfaces/http/routes/category-size.routes"
import { CategoryRoutes } from "@interfaces/http/routes/category.routes"
import { ProductSizePriceRoutes } from "@interfaces/http/routes/product-size-price.routes"
import { ProductRoutes } from "@interfaces/http/routes/product.routes"
import { ShiftRoutes } from "@interfaces/http/routes/shift.routes"

export interface AppDependencies {
    categoryRoutes: CategoryRoutes
    categoryExtraRoutes: CategoryExtraRoutes
    categorySizeRoutes: CategorySizeRoutes
    productRoutes: ProductRoutes
    productSizePriceRoutes: ProductSizePriceRoutes
    shiftRoutes: ShiftRoutes
}
