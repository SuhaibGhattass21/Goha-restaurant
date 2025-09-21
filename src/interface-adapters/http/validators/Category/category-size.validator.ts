import { body, param, query, type ValidationChain } from "express-validator"

export class CategorySizeValidator {
  static createCategorySize(): ValidationChain[] {
    return [
      body("size_name")
        .notEmpty()
        .withMessage("Size name is required")
        .isLength({ min: 1, max: 50 })
        .withMessage("Size name must be between 1 and 50 characters")
        .trim(),
      body("category_id")
        .notEmpty()
        .withMessage("Category ID is required")
        .isUUID()
        .withMessage("Invalid category ID format"),
    ]
  }

  static updateCategorySize(): ValidationChain[] {
    return [
      param("id").isUUID().withMessage("Invalid category size ID format"),
      body("size_name")
        .optional()
        .isLength({ min: 1, max: 50 })
        .withMessage("Size name must be between 1 and 50 characters")
        .trim(),
      body("category_id")
        .optional()
        .isUUID()
        .withMessage("Invalid category ID format"),
    ]
  }

  static getCategorySizeById(): ValidationChain[] {
    return [param("id").isUUID().withMessage("Invalid category size ID format")]
  }

  static getCategorySizesByCategoryId(): ValidationChain[] {
    return [param("categoryId").isUUID().withMessage("Invalid category ID format")]
  }

  static deleteCategorySize(): ValidationChain[] {
    return [param("id").isUUID().withMessage("Invalid category size ID format")]
  }

  static getCategorySizes(): ValidationChain[] {
    return [
      query("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer").toInt(),
      query("limit").optional().isInt({ min: 1, max: 100 }).withMessage("Limit must be between 1 and 100").toInt(),
    ]
  }
}