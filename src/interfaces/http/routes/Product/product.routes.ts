import { Router } from "express"
import type { ProductController } from "../../controllers/Product/product.controller"
import { ProductValidator } from "../../validators/Product/product.validator"

export class ProductRoutes {
  /**
 * @swagger
 * tags:
 *   name: Products
 *   description: Manage restaurant products
 */

  /**
   * @swagger
   * /products:
   *   get:
   *     summary: Get all products
   *     tags: [Products]
   *     responses:
   *       200:
   *         description: Product list
   */

  /**
   * @swagger
   * /products:
   *   post:
   *     summary: Create a new product
   *     tags: [Products]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateProductDTO'
   *     responses:
   *       201:
   *         description: Product created
   */

  /**
   * @swagger
   * /products/{id}:
   *   get:
   *     summary: Get product by ID
   *     tags: [Products]
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Product details
   */

  /**
   * @swagger
   * /products/{id}:
   *   put:
   *     summary: Update product
   *     tags: [Products]
   *     parameters:
   *       - name: id
   *         in: path
   *         schema:
   *           type: string
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateProductDTO'
   *     responses:
   *       200:
   *         description: Product updated
   */

  /**
   * @swagger
   * /products/{id}:
   *   delete:
   *     summary: Delete product
   *     tags: [Products]
   *     parameters:
   *       - name: id
   *         in: path
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Product deleted
   */

  private router: Router
  private productController: ProductController

  constructor(productController: ProductController) {
    this.router = Router()
    this.productController = productController
    this.initializeRoutes()
  }

  private initializeRoutes(): void {
    // POST /products - Create a new product
    this.router.post(
      "/",
      ProductValidator.createProduct(),
      this.productController.createProduct.bind(this.productController),
    )

    // GET /products - Get all products with pagination
    this.router.get(
      "/",
      ProductValidator.getProducts(),
      this.productController.getAllProducts.bind(this.productController),
    )

    // GET /products/category/:categoryId - Get products by category
    this.router.get(
      "/category/:categoryId",
      ProductValidator.getProductsByCategory(),
      this.productController.getProductsByCategory.bind(this.productController),
    )

    // GET /products/:id - Get product by ID
    this.router.get(
      "/:id",
      ProductValidator.getProductById(),
      this.productController.getProductById.bind(this.productController),
    )

    // PUT /products/:id - Update product
    this.router.put(
      "/:id",
      ProductValidator.updateProduct(),
      this.productController.updateProduct.bind(this.productController),
    )

    // DELETE /products/:id - Delete product
    this.router.delete(
      "/:id",
      ProductValidator.deleteProduct(),
      this.productController.deleteProduct.bind(this.productController),
    )
  }

  public getRouter(): Router {
    return this.router
  }
}
