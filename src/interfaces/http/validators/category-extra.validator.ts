import { body, param, query, type ValidationChain } from "express-validator"

export class CategoryExtraValidator {
  static createCategoryExtra(): ValidationChain[] {
    return [
      body("name")
        .notEmpty()
        .withMessage("Name is required")
        .isLength({ min: 2, max: 100 })
        .withMessage("Name must be between 2 and 100 characters")
        .trim(),
      body("price")
        .notEmpty()
        .withMessage("Price is required")
        .isNumeric()
        .withMessage("Price must be a number")
        .custom((value) => {
          if (parseFloat(value) < 0) {
            throw new Error("Price must be greater than or equal to 0")
          }
          return true
        }),
      body("category_id")
        .notEmpty()
        .withMessage("Category ID is required")
        .isUUID()
        .withMessage("Invalid category ID format"),
    ]
  }

  static updateCategoryExtra(): ValidationChain[] {
    return [
      param("id").isUUID().withMessage("Invalid category extra ID format"),
      body("name")
        .optional()
        .isLength({ min: 2, max: 100 })
        .withMessage("Name must be between 2 and 100 characters")
        .trim(),
      body("price")
        .optional()
        .isNumeric()
        .withMessage("Price must be a number")
        .custom((value) => {
          if (value !== undefined && parseFloat(value) < 0) {
            throw new Error("Price must be greater than or equal to 0")
          }
          return true
        }),
      body("category_id")
        .optional()
        .isUUID()
        .withMessage("Invalid category ID format"),
    ]
  }

  static getCategoryExtraById(): ValidationChain[] {
    return [param("id").isUUID().withMessage("Invalid category extra ID format")]
  }

  static getCategoryExtrasByCategoryId(): ValidationChain[] {
    return [param("categoryId").isUUID().withMessage("Invalid category ID format")]
  }

  static deleteCategoryExtra(): ValidationChain[] {
    return [param("id").isUUID().withMessage("Invalid category extra ID format")]
  }

  static getCategoryExtras(): ValidationChain[] {
    return [
      query("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer").toInt(),
      query("limit").optional().isInt({ min: 1, max: 100 }).withMessage("Limit must be between 1 and 100").toInt(),
    ]
  }
}