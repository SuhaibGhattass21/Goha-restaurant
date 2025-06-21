import { Router } from "express"
import type { CategoryExtraController } from "../controllers/category-extra.controller"
import { CategoryExtraValidator } from "../validators/category-extra.validator"

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
      CategoryExtraValidator.createCategoryExtra(),
      this.categoryExtraController.createCategoryExtra.bind(this.categoryExtraController),
    )

    // GET /category-extras - Get all category extras with pagination
    this.router.get(
      "/",
      CategoryExtraValidator.getCategoryExtras(),
      this.categoryExtraController.getAllCategoryExtras.bind(this.categoryExtraController),
    )

    // 🔥 PUT THIS ROUTE BEFORE THE /:id ROUTE
    // GET /category-extras/category/:categoryId - Get extras by category ID
    this.router.get(
      "/category/:categoryId",
      CategoryExtraValidator.getCategoryExtrasByCategoryId(),
      this.categoryExtraController.getCategoryExtrasByCategoryId.bind(this.categoryExtraController),
    )

    // GET /category-extras/:id - Get category extra by ID
    this.router.get(
      "/:id",
      CategoryExtraValidator.getCategoryExtraById(),
      this.categoryExtraController.getCategoryExtraById.bind(this.categoryExtraController),
    )

    // PUT /category-extras/:id - Update category extra
    this.router.put(
      "/:id",
      CategoryExtraValidator.updateCategoryExtra(),
      this.categoryExtraController.updateCategoryExtra.bind(this.categoryExtraController),
    )

    // DELETE /category-extras/:id - Delete category extra
    this.router.delete(
      "/:id",
      CategoryExtraValidator.deleteCategoryExtra(),
      this.categoryExtraController.deleteCategoryExtra.bind(this.categoryExtraController),
    )
  }

  public getRouter(): Router {
    return this.router
  }
}