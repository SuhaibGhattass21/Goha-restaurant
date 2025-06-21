import { body, param, query, type ValidationChain } from "express-validator"

export class ProductValidator {
  static createProduct(): ValidationChain[] {
    return [
      body("name")
        .notEmpty()
        .withMessage("Name is required")
        .isLength({ min: 2, max: 100 })
        .withMessage("Name must be between 2 and 100 characters")
        .trim(),
      body("description")
        .optional()
        .isLength({ max: 500 })
        .withMessage("Description must not exceed 500 characters")
        .trim(),
      body("is_active").optional().isBoolean().withMessage("is_active must be a boolean"),
      body("category_id")
        .notEmpty()
        .withMessage("Category ID is required")
        .isUUID()
        .withMessage("Category ID must be a valid UUID"),
    ]
  }

  static updateProduct(): ValidationChain[] {
    return [
      param("id").isUUID().withMessage("Invalid product ID format"),
      body("name")
        .optional()
        .isLength({ min: 2, max: 100 })
        .withMessage("Name must be between 2 and 100 characters")
        .trim(),
      body("description")
        .optional()
        .isLength({ max: 500 })
        .withMessage("Description must not exceed 500 characters")
        .trim(),
      body("is_active").optional().isBoolean().withMessage("is_active must be a boolean"),
      body("category_id").optional().isUUID().withMessage("Category ID must be a valid UUID"),
    ]
  }

  static getProductById(): ValidationChain[] {
    return [param("id").isUUID().withMessage("Invalid product ID format")]
  }

  static deleteProduct(): ValidationChain[] {
    return [param("id").isUUID().withMessage("Invalid product ID format")]
  }

  static getProducts(): ValidationChain[] {
    return [
      query("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer").toInt(),
      query("limit").optional().isInt({ min: 1, max: 100 }).withMessage("Limit must be between 1 and 100").toInt(),
    ]
  }

  static getProductsByCategory(): ValidationChain[] {
    return [
      param("categoryId").isUUID().withMessage("Invalid category ID format"),
      query("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer").toInt(),
      query("limit").optional().isInt({ min: 1, max: 100 }).withMessage("Limit must be between 1 and 100").toInt(),
    ]
  }
}
