import { body, param, query, type ValidationChain } from "express-validator"

export class ProductSizePriceValidator {
  static createProductSizePrice(): ValidationChain[] {
    return [
      body("price")
        .notEmpty()
        .withMessage("Price is required")
        .isNumeric()
        .withMessage("Price must be a number")
        .custom((value) => {
          if (Number.parseFloat(value) < 0) {
            throw new Error("Price must be a positive number")
          }
          return true
        }),
      body("product_id")
        .notEmpty()
        .withMessage("Product ID is required")
        .isUUID()
        .withMessage("Product ID must be a valid UUID"),
      body("size_id")
        .notEmpty()
        .withMessage("Size ID is required")
        .isUUID()
        .withMessage("Size ID must be a valid UUID"),
    ]
  }

  static updateProductSizePrice(): ValidationChain[] {
    return [
      param("id").isUUID().withMessage("Invalid product size price ID format"),
      body("price")
        .optional()
        .isNumeric()
        .withMessage("Price must be a number")
        .custom((value) => {
          if (value !== undefined && Number.parseFloat(value) < 0) {
            throw new Error("Price must be a positive number")
          }
          return true
        }),
      body("product_id").optional().isUUID().withMessage("Product ID must be a valid UUID"),
      body("size_id").optional().isUUID().withMessage("Size ID must be a valid UUID"),
    ]
  }

  static getProductSizePriceById(): ValidationChain[] {
    return [param("id").isUUID().withMessage("Invalid product size price ID format")]
  }

  static deleteProductSizePrice(): ValidationChain[] {
    return [param("id").isUUID().withMessage("Invalid product size price ID format")]
  }

  static getProductSizePrices(): ValidationChain[] {
    return [
      query("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer").toInt(),
      query("limit").optional().isInt({ min: 1, max: 100 }).withMessage("Limit must be between 1 and 100").toInt(),
    ]
  }

  static getProductSizePricesByProduct(): ValidationChain[] {
    return [
      param("productId").isUUID().withMessage("Invalid product ID format"),
      query("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer").toInt(),
      query("limit").optional().isInt({ min: 1, max: 100 }).withMessage("Limit must be between 1 and 100").toInt(),
    ]
  }
}
