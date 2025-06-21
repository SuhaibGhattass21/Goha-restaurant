import { CategoryExtraRoutes } from "../../routes/Category/category-extra.routes"
import { CategorySizeRoutes } from "../../routes/Category/category-size.routes"
import { CategoryRoutes } from "../../routes/Category/category.routes"
import { ProductSizePriceRoutes } from "../../routes/Product/product-size-price.routes"
import { ProductRoutes } from "../../routes/Product/product.routes"
import { ShiftRoutes } from "../../routes/shift.routes"

export interface AppDependencies {
    categoryRoutes: CategoryRoutes
    categoryExtraRoutes: CategoryExtraRoutes
    categorySizeRoutes: CategorySizeRoutes
    productRoutes: ProductRoutes
    productSizePriceRoutes: ProductSizePriceRoutes
    shiftRoutes: ShiftRoutes
}
