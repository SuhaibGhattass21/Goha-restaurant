import { Router } from "express"
import type { ProductSizePriceController } from "../../controllers/Product/product-size-price.controller"
import { ProductSizePriceValidator } from "../../validators/Product/product-size-price.validator"
import { AuthorizationMiddleware } from "../../middlewares/authorization.middleware"

export class ProductSizePriceRoutes {
  private router: Router
  private productSizePriceController: ProductSizePriceController

  constructor(productSizePriceController: ProductSizePriceController) {
    this.router = Router()
    this.productSizePriceController = productSizePriceController
    this.initializeRoutes()
  }

  private initializeRoutes(): void {
    // POST /product-size-prices - Create a new product size price
    this.router.post(
      "/",
      AuthorizationMiddleware.requireAnyPermission([
        "OWNER_ACCESS",
        "access:products",
      ]),
      ProductSizePriceValidator.createProductSizePrice(),
      this.productSizePriceController.createProductSizePrice.bind(this.productSizePriceController),
    )

    // GET /product-size-prices - Get all product size prices with pagination
    this.router.get(
      "/",
      AuthorizationMiddleware.requireAnyPermission([
        "OWNER_ACCESS",
        "access:products",
        "access:cashier",
      ]),
      ProductSizePriceValidator.getProductSizePrices(),
      this.productSizePriceController.getAllProductSizePrices.bind(this.productSizePriceController),
    )

    // GET /product-size-prices/product/:productId - Get product size prices by product
    this.router.get(
      "/product/:productId",
      AuthorizationMiddleware.requireAnyPermission([
        "OWNER_ACCESS",
        "access:products",
        "access:cashier",
      ]),
      ProductSizePriceValidator.getProductSizePricesByProduct(),
      this.productSizePriceController.getProductSizePricesByProduct.bind(this.productSizePriceController),
    )

    // GET /product-size-prices/:id - Get product size price by ID
    this.router.get(
      "/:id",
      AuthorizationMiddleware.requireAnyPermission([
        "OWNER_ACCESS",
        "access:products",
        "access:cashier",
      ]),
      ProductSizePriceValidator.getProductSizePriceById(),
      this.productSizePriceController.getProductSizePriceById.bind(this.productSizePriceController),
    )

    // PUT /product-size-prices/:id - Update product size price
    this.router.put(
      "/:id",
      AuthorizationMiddleware.requireAnyPermission([
        "OWNER_ACCESS",
        "access:products",
      ]),
      ProductSizePriceValidator.updateProductSizePrice(),
      this.productSizePriceController.updateProductSizePrice.bind(this.productSizePriceController),
    )

    // DELETE /product-size-prices/:id - Delete product size price
    this.router.delete(
      "/:id",
      AuthorizationMiddleware.requireAnyPermission([
        "OWNER_ACCESS",
        "access:products",
      ]),
      ProductSizePriceValidator.deleteProductSizePrice(),
      this.productSizePriceController.deleteProductSizePrice.bind(this.productSizePriceController),
    )
  }

  public getRouter(): Router {
    return this.router
  }
}
