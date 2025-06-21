import { body, param, query, type ValidationChain } from "express-validator"

export class CategoryValidator {
  static createCategory(): ValidationChain[] {
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
    ]
  }

  static updateCategory(): ValidationChain[] {
    return [
      param("id").isUUID().withMessage("Invalid category ID format"),
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
    ]
  }

  static getCategoryById(): ValidationChain[] {
    return [param("id").isUUID().withMessage("Invalid category ID format")]
  }

  static deleteCategory(): ValidationChain[] {
    return [param("id").isUUID().withMessage("Invalid category ID format")]
  }

  static getCategories(): ValidationChain[] {
    return [
      query("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer").toInt(),
      query("limit").optional().isInt({ min: 1, max: 100 }).withMessage("Limit must be between 1 and 100").toInt(),
    ]
  }
}
