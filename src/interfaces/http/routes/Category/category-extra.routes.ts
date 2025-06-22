import { Router } from "express"
import type { CategoryExtraController } from "../../controllers/Category/category-extra.controller"
import { CategoryExtraValidator } from "../../validators/Category/category-extra.validator"

export class CategoryExtraRoutes {
  /**
 * @swagger
 * tags:
 *   name: CategoryExtras
 *   description: Manage extra options per category
 */

  /**
   * @swagger
   * /category-extras:
   *   get:
   *     summary: Get all category extras
   *     tags: [CategoryExtras]
   *     responses:
   *       200:
   *         description: List of extras
   */

  /**
   * @swagger
   * /category-extras:
   *   post:
   *     summary: Add a new extra to a category
   *     tags: [CategoryExtras]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateCategoryExtraDTO'
   *     responses:
   *       201:
   *         description: Extra created
   */

  /**
   * @swagger
   * /category-extras/{id}:
   *   get:
   *     summary: Get category extra by ID
   *     tags: [CategoryExtras]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Extra found
   */

  /**
   * @swagger
   * /category-extras/{id}:
   *   put:
   *     summary: Update a category extra
   *     tags: [CategoryExtras]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateCategoryExtraDTO'
   *     responses:
   *       200:
   *         description: Extra updated
   */

  /**
   * @swagger
   * /category-extras/{id}:
   *   delete:
   *     summary: Delete a category extra
   *     tags: [CategoryExtras]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Extra deleted
   */

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