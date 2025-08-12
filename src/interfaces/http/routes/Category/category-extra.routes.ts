import { Router } from "express"
import type { CategoryExtraController } from "../../controllers/Category/category-extra.controller"
import { CategoryExtraValidator } from "../../validators/Category/category-extra.validator"
import { AuthorizationMiddleware } from "../../middlewares/authorization.middleware"

export class CategoryExtraRoutes {
  private router: Router
  private categoryExtraController: CategoryExtraController

  constructor(categoryExtraController: CategoryExtraController) {
    this.router = Router()
    this.categoryExtraController = categoryExtraController
    this.initializeRoutes()
  }

  private initializeRoutes(): void {
    // POST /category-extras - Create a new category extra
    this.router.post(
      "/",
      AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:category']),
      CategoryExtraValidator.createCategoryExtra(),
      this.categoryExtraController.createCategoryExtra.bind(this.categoryExtraController),
    )

    // GET /category-extras - Get all category extras with pagination
    this.router.get(
      "/",
      AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:category', 'access:cashier']),
      CategoryExtraValidator.getCategoryExtras(),
      this.categoryExtraController.getAllCategoryExtras.bind(this.categoryExtraController),
    )

    // 🔥 PUT THIS ROUTE BEFORE THE /:id ROUTE
    // GET /category-extras/category/:categoryId - Get extras by category ID
    this.router.get(
      "/category/:categoryId",
      AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:category', 'access:cashier']),
      CategoryExtraValidator.getCategoryExtrasByCategoryId(),
      this.categoryExtraController.getCategoryExtrasByCategoryId.bind(this.categoryExtraController),
    )

    // GET /category-extras/:id - Get category extra by ID
    this.router.get(
      "/:id",
      AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:category', 'access:cashier']),
      CategoryExtraValidator.getCategoryExtraById(),
      this.categoryExtraController.getCategoryExtraById.bind(this.categoryExtraController),
    )

    // PUT /category-extras/:id - Update category extra
    this.router.put(
      "/:id",
      AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:category']),
      CategoryExtraValidator.updateCategoryExtra(),
      this.categoryExtraController.updateCategoryExtra.bind(this.categoryExtraController),
    )

    // DELETE /category-extras/:id - Delete category extra
    this.router.delete(
      "/:id",
      AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:category']),
      CategoryExtraValidator.deleteCategoryExtra(),
      this.categoryExtraController.deleteCategoryExtra.bind(this.categoryExtraController),
    )
  }

  public getRouter(): Router {
    return this.router
  }
}