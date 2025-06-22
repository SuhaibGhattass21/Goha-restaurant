import { Router } from "express"
import type { CategorySizeController } from "../../controllers/Category/category-size.controller"
import { CategorySizeValidator } from "../../validators/Category/category-size.validator"

export class CategorySizeRoutes {
  /**
 * @swagger
 * tags:
 *   name: CategorySizes
 *   description: Manage size options per category
 */

  /**
   * @swagger
   * /category-sizes:
   *   get:
   *     summary: Get all category sizes
   *     tags: [CategorySizes]
   *     responses:
   *       200:
   *         description: List of sizes
   */

  /**
   * @swagger
   * /category-sizes:
   *   post:
   *     summary: Add a new size to a category
   *     tags: [CategorySizes]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateCategorySizeDTO'
   *     responses:
   *       201:
   *         description: Size created
   */

  /**
   * @swagger
   * /category-sizes/{id}:
   *   get:
   *     summary: Get category size by ID
   *     tags: [CategorySizes]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Size found
   */

  /**
   * @swagger
   * /category-sizes/{id}:
   *   put:
   *     summary: Update a category size
   *     tags: [CategorySizes]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateCategorySizeDTO'
   *     responses:
   *       200:
   *         description: Size updated
   */

  /**
   * @swagger
   * /category-sizes/{id}:
   *   delete:
   *     summary: Delete a category size
   *     tags: [CategorySizes]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Size deleted
   */

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