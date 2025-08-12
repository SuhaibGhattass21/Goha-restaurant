import { Router } from "express"
import type { ProductController } from "../../controllers/Product/product.controller"
import { ProductValidator } from "../../validators/Product/product.validator"
import { AuthorizationMiddleware } from "../../middlewares/authorization.middleware"

export class ProductRoutes {
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
      AuthorizationMiddleware.requireAnyPermission([
        "OWNER_ACCESS",
        "access:products",
      ]),
      ProductValidator.createProduct(),
      this.productController.createProduct.bind(this.productController),
    )

    // GET /products - Get all products with pagination
    this.router.get(
      "/",
      AuthorizationMiddleware.requireAnyPermission([
        "OWNER_ACCESS",
        "access:products",
        "access:cashier",
      ]),
      ProductValidator.getProducts(),
      this.productController.getAllProducts.bind(this.productController),
    )

    // GET /products/category/:categoryId - Get products by category
    this.router.get(
      "/category/:categoryId",
      AuthorizationMiddleware.requireAnyPermission([
        "OWNER_ACCESS",
        "access:products",
        "access:cashier",
      ]),
      ProductValidator.getProductsByCategory(),
      this.productController.getProductsByCategory.bind(this.productController),
    )

    // GET /products/:id - Get product by ID
    this.router.get(
      "/:id",
      AuthorizationMiddleware.requireAnyPermission([
        "OWNER_ACCESS",
        "access:products",
        "access:cashier",
      ]),
      ProductValidator.getProductById(),
      this.productController.getProductById.bind(this.productController),
    )

    // PUT /products/:id - Update product
    this.router.put(
      "/:id",
      AuthorizationMiddleware.requireAnyPermission([
        "OWNER_ACCESS",
        "access:products",
      ]),
      ProductValidator.updateProduct(),
      this.productController.updateProduct.bind(this.productController),
    )

    // DELETE /products/:id - Delete product
    this.router.delete(
      "/:id",
      AuthorizationMiddleware.requireAnyPermission([
        "OWNER_ACCESS",
        "access:products",
      ]),
      ProductValidator.deleteProduct(),
      this.productController.deleteProduct.bind(this.productController),
    )
  }

  public getRouter(): Router {
    return this.router
  }
}
