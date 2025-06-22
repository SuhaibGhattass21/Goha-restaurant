import { Router } from "express"
import type { CategoryController } from "../../controllers/Category/category.controller"
import { CategoryValidator } from "../../validators/Category/category.validator"

export class CategoryRoutes {
  /**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Category management for menu items
 */

  /**
   * @swagger
   * /categories:
   *   get:
   *     summary: Get all categories
   *     tags: [Categories]
   *     responses:
   *       200:
   *         description: List of categories
   */

  /**
   * @swagger
   * /categories/{id}:
   *   get:
   *     summary: Get category by ID
   *     tags: [Categories]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *           format: uuid
   *     responses:
   *       200:
   *         description: Category found
   *       404:
   *         description: Category not found
   */

  /**
   * @swagger
   * /categories:
   *   post:
   *     summary: Create a new category
   *     tags: [Categories]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateCategoryDTO'
   *     responses:
   *       201:
   *         description: Category created
   */

  /**
   * @swagger
   * /categories/{id}:
   *   put:
   *     summary: Update category
   *     tags: [Categories]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateCategoryDTO'
   *     responses:
   *       200:
   *         description: Category updated
   */

  /**
   * @swagger
   * /categories/{id}:
   *   delete:
   *     summary: Delete category
   *     tags: [Categories]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Category deleted
   */

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
