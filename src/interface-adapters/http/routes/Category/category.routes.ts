import { Router } from "express"
import type { CategoryController } from "../../controllers/Category/category.controller"
import { AuthorizationMiddleware } from "../../middlewares/authorization.middleware"
import { validateBody, validateParamsDto, validateQuery } from "../../middlewares/validation.middleware"
import { CreateCategoryDto, UpdateCategoryDto, CategoryIdParamDto, PaginationQueryDto } from "../../../../application/dtos/Category/category.dto"

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
      validateBody(CreateCategoryDto),
      this.categoryController.createCategory.bind(this.categoryController),
    )

    // GET /categories - Get all categories with pagination
    this.router.get(
      "/",
      AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:category', 'access:cashier']),
      validateQuery(PaginationQueryDto),
      this.categoryController.getAllCategories.bind(this.categoryController),
    )

    // GET /categories/:id - Get category by ID
    this.router.get(
      "/:id",
      AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:category', 'access:cashier']),
      validateParamsDto(CategoryIdParamDto),
      this.categoryController.getCategoryById.bind(this.categoryController),
    )

    // PUT /categories/:id - Update category
    this.router.put(
      "/:id",
      AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:category']),
      validateParamsDto(CategoryIdParamDto),
      validateBody(UpdateCategoryDto),
      this.categoryController.updateCategory.bind(this.categoryController),
    )

    // DELETE /categories/:id - Delete category
    this.router.delete(
      "/:id",
      AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:category']),
      validateParamsDto(CategoryIdParamDto),
      this.categoryController.deleteCategory.bind(this.categoryController),
    )
  }

  public getRouter(): Router {
    return this.router
  }
}
