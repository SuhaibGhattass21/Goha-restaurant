import { Router } from "express"
import type { ProductController } from "../../controllers/Product/product.controller"
import { AuthorizationMiddleware } from "../../middlewares/authorization.middleware"
import { validateBody, validateParamsDto, validateQuery } from "../../middlewares/validation.middleware"
import { CreateProductDto, UpdateProductDto, ProductIdParamDto, CategoryIdParamDto, PaginationQueryDto } from "../../../../application/dtos/Product/product.dto"

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
      validateBody(CreateProductDto),
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
      validateQuery(PaginationQueryDto),
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
      validateParamsDto(CategoryIdParamDto),
      validateQuery(PaginationQueryDto),
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
      validateParamsDto(ProductIdParamDto),
      this.productController.getProductById.bind(this.productController),
    )

    // PUT /products/:id - Update product
    this.router.put(
      "/:id",
      AuthorizationMiddleware.requireAnyPermission([
        "OWNER_ACCESS",
        "access:products",
      ]),
      validateParamsDto(ProductIdParamDto),
      validateBody(UpdateProductDto),
      this.productController.updateProduct.bind(this.productController),
    )

    // DELETE /products/:id - Delete product
    this.router.delete(
      "/:id",
      AuthorizationMiddleware.requireAnyPermission([
        "OWNER_ACCESS",
        "access:products",
      ]),
      validateParamsDto(ProductIdParamDto),
      this.productController.deleteProduct.bind(this.productController),
    )
  }

  public getRouter(): Router {
    return this.router
  }
}
