import { Router } from "express"
import type { CategoryController } from "../../controllers/Category/category.controller"
import { CategoryValidator } from "../../validators/Category/category.validator"
import { AuthorizationMiddleware } from "../../middlewares/authorization.middleware"

export class CategoryRoutes {
  private router: Router
  private categoryController: CategoryController

  constructor(categoryController: CategoryController) {
    this.router = Router()
    this.categoryController = categoryController
    this.initializeRoutes()
  }

  private initializeRoutes(): void {
    // POST /categories - Create a new category
    this.router.post(
      "/",
      AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:category']),
      CategoryValidator.createCategory(),
      this.categoryController.createCategory.bind(this.categoryController),
    )

    // GET /categories - Get all categories with pagination
    this.router.get(
      "/",
      AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:category', 'access:cashier']),
      CategoryValidator.getCategories(),
      this.categoryController.getAllCategories.bind(this.categoryController),
    )

    // GET /categories/:id - Get category by ID
    this.router.get(
      "/:id",
      AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:category', 'access:cashier']),
      CategoryValidator.getCategoryById(),
      this.categoryController.getCategoryById.bind(this.categoryController),
    )

    // PUT /categories/:id - Update category
    this.router.put(
      "/:id",
      AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:category']),
      CategoryValidator.updateCategory(),
      this.categoryController.updateCategory.bind(this.categoryController),
    )

    // DELETE /categories/:id - Delete category
    this.router.delete(
      "/:id",
      AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:category']),
      CategoryValidator.deleteCategory(),
      this.categoryController.deleteCategory.bind(this.categoryController),
    )
  }

  public getRouter(): Router {
    return this.router
  }
}
