import { Router } from "express"
import type { CategorySizeController } from "../controllers/category-size.controller"
import { CategorySizeValidator } from "../validators/category-size.validator"

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
      CategorySizeValidator.createCategorySize(),
      this.categorySizeController.createCategorySize.bind(this.categorySizeController),
    )

    // GET /category-sizes - Get all category sizes with pagination
    this.router.get(
      "/",
      CategorySizeValidator.getCategorySizes(),
      this.categorySizeController.getAllCategorySizes.bind(this.categorySizeController),
    )

    // GET /category-sizes/:id - Get category size by ID
    this.router.get(
      "/:id",
      CategorySizeValidator.getCategorySizeById(),
      this.categorySizeController.getCategorySizeById.bind(this.categorySizeController),
    )

    // GET /category-sizes/category/:categoryId - Get sizes by category ID
    this.router.get(
      "/category/:categoryId",
      CategorySizeValidator.getCategorySizesByCategoryId(),
      this.categorySizeController.getCategorySizesByCategoryId.bind(this.categorySizeController),
    )

    // PUT /category-sizes/:id - Update category size
    this.router.put(
      "/:id",
      CategorySizeValidator.updateCategorySize(),
      this.categorySizeController.updateCategorySize.bind(this.categorySizeController),
    )

    // DELETE /category-sizes/:id - Delete category size
    this.router.delete(
      "/:id",
      CategorySizeValidator.deleteCategorySize(),
      this.categorySizeController.deleteCategorySize.bind(this.categorySizeController),
    )
  }

  public getRouter(): Router {
    return this.router
  }
}