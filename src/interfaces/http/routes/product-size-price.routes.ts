import { Router } from "express"
import type { ProductSizePriceController } from "../controllers/product-size-price.controller"
import { ProductSizePriceValidator } from "../validators/product-size-price.validator"

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
      ProductSizePriceValidator.createProductSizePrice(),
      this.productSizePriceController.createProductSizePrice.bind(this.productSizePriceController),
    )

    // GET /product-size-prices - Get all product size prices with pagination
    this.router.get(
      "/",
      ProductSizePriceValidator.getProductSizePrices(),
      this.productSizePriceController.getAllProductSizePrices.bind(this.productSizePriceController),
    )

    // GET /product-size-prices/product/:productId - Get product size prices by product
    this.router.get(
      "/product/:productId",
      ProductSizePriceValidator.getProductSizePricesByProduct(),
      this.productSizePriceController.getProductSizePricesByProduct.bind(this.productSizePriceController),
    )

    // GET /product-size-prices/:id - Get product size price by ID
    this.router.get(
      "/:id",
      ProductSizePriceValidator.getProductSizePriceById(),
      this.productSizePriceController.getProductSizePriceById.bind(this.productSizePriceController),
    )

    // PUT /product-size-prices/:id - Update product size price
    this.router.put(
      "/:id",
      ProductSizePriceValidator.updateProductSizePrice(),
      this.productSizePriceController.updateProductSizePrice.bind(this.productSizePriceController),
    )

    // DELETE /product-size-prices/:id - Delete product size price
    this.router.delete(
      "/:id",
      ProductSizePriceValidator.deleteProductSizePrice(),
      this.productSizePriceController.deleteProductSizePrice.bind(this.productSizePriceController),
    )
  }

  public getRouter(): Router {
    return this.router
  }
}
