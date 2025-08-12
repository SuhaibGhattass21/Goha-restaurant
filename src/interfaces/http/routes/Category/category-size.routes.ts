import { Router } from "express"
import type { CategorySizeController } from "../../controllers/Category/category-size.controller"
import { CategorySizeValidator } from "../../validators/Category/category-size.validator"
import { AuthorizationMiddleware } from "../../middlewares/authorization.middleware"

export class CategorySizeRoutes {
  private router: Router
  private categorySizeController: CategorySizeController

  constructor(categorySizeController: CategorySizeController) {
    this.router = Router()
    this.categorySizeController = categorySizeController
    this.initializeRoutes()
  }

  private initializeRoutes(): void {
    // POST /category-sizes - Create a new category size
    this.router.post(
      "/",
      AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:category']),
      CategorySizeValidator.createCategorySize(),
      this.categorySizeController.createCategorySize.bind(this.categorySizeController),
    )

    // GET /category-sizes - Get all category sizes with pagination
    this.router.get(
      "/",
      AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:category', 'access:cashier']),
      CategorySizeValidator.getCategorySizes(),
      this.categorySizeController.getAllCategorySizes.bind(this.categorySizeController),
    )

    // GET /category-sizes/:id - Get category size by ID
    this.router.get(
      "/:id",
      AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:category', 'access:cashier']),
      CategorySizeValidator.getCategorySizeById(),
      this.categorySizeController.getCategorySizeById.bind(this.categorySizeController),
    )

    // GET /category-sizes/category/:categoryId - Get sizes by category ID
    this.router.get(
      "/category/:categoryId",
      AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:category', 'access:cashier']),
      CategorySizeValidator.getCategorySizesByCategoryId(),
      this.categorySizeController.getCategorySizesByCategoryId.bind(this.categorySizeController),
    )

    // PUT /category-sizes/:id - Update category size
    this.router.put(
      "/:id",
      AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:category']),
      CategorySizeValidator.updateCategorySize(),
      this.categorySizeController.updateCategorySize.bind(this.categorySizeController),
    )

    // DELETE /category-sizes/:id - Delete category size
    this.router.delete(
      "/:id",
      AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:category']),
      CategorySizeValidator.deleteCategorySize(),
      this.categorySizeController.deleteCategorySize.bind(this.categorySizeController),
    )
  }

  public getRouter(): Router {
    return this.router
  }
}