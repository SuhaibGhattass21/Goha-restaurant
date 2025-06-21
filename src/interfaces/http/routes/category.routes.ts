import { Router } from "express"
import type { CategoryController } from "../controllers/category.controller"
import { CategoryValidator } from "../validators/category.validator"

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
      CategoryValidator.createCategory(),
      this.categoryController.createCategory.bind(this.categoryController),
    )

    // GET /categories - Get all categories with pagination
    this.router.get(
      "/",
      CategoryValidator.getCategories(),
      this.categoryController.getAllCategories.bind(this.categoryController),
    )

    // GET /categories/:id - Get category by ID
    this.router.get(
      "/:id",
      CategoryValidator.getCategoryById(),
      this.categoryController.getCategoryById.bind(this.categoryController),
    )

    // PUT /categories/:id - Update category
    this.router.put(
      "/:id",
      CategoryValidator.updateCategory(),
      this.categoryController.updateCategory.bind(this.categoryController),
    )

    // DELETE /categories/:id - Delete category
    this.router.delete(
      "/:id",
      CategoryValidator.deleteCategory(),
      this.categoryController.deleteCategory.bind(this.categoryController),
    )
  }

  public getRouter(): Router {
    return this.router
  }
}
