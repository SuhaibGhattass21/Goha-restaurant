import { body, param, query, type ValidationChain } from "express-validator"
import { StockItemType, StockItemStatus } from "../../../../domain/enums/Stock.enums"

export class StockItemValidator {
  static createStockItem(): ValidationChain[] {
    return [
      body("name")
        .notEmpty()
        .withMessage("Name is required")
        .isLength({ min: 2, max: 100 })
        .withMessage("Name must be between 2 and 100 characters")
        .trim(),
      body("type")
        .notEmpty()
        .withMessage("Type is required")
        .isIn(Object.values(StockItemType))
        .withMessage("Invalid stock item type"),
      body("unit")
        .notEmpty()
        .withMessage("Unit is required")
        .isLength({ min: 1, max: 20 })
        .withMessage("Unit must be between 1 and 20 characters")
        .trim(),
      body("current_quantity")
        .notEmpty()
        .withMessage("Current quantity is required")
        .isNumeric()
        .withMessage("Current quantity must be a number")
        .custom((value) => {
          if (value < 0) {
            throw new Error("Current quantity must be non-negative")
          }
          return true
        }),
      body("minimum_value")
        .notEmpty()
        .withMessage("Minimum value is required")
        .isNumeric()
        .withMessage("Minimum value must be a number")
        .custom((value) => {
          if (value < 0) {
            throw new Error("Minimum value must be non-negative")
          }
          return true
        }),
      body("status")
        .notEmpty()
        .withMessage("Status is required")
        .isIn(Object.values(StockItemStatus))
        .withMessage("Invalid stock item status"),
    ]
  }

  static updateStockItem(): ValidationChain[] {
    return [
      param("id").isUUID().withMessage("Invalid stock item ID format"),
      body("name")
        .optional()
        .isLength({ min: 2, max: 100 })
        .withMessage("Name must be between 2 and 100 characters")
        .trim(),
      body("type").optional().isIn(Object.values(StockItemType)).withMessage("Invalid stock item type"),
      body("unit")
        .optional()
        .isLength({ min: 1, max: 20 })
        .withMessage("Unit must be between 1 and 20 characters")
        .trim(),
      body("current_quantity")
        .optional()
        .isNumeric()
        .withMessage("Current quantity must be a number")
        .custom((value) => {
          if (value < 0) {
            throw new Error("Current quantity must be non-negative")
          }
          return true
        }),
      body("minimum_value")
        .optional()
        .isNumeric()
        .withMessage("Minimum value must be a number")
        .custom((value) => {
          if (value < 0) {
            throw new Error("Minimum value must be non-negative")
          }
          return true
        }),
      body("status").optional().isIn(Object.values(StockItemStatus)).withMessage("Invalid stock item status"),
    ]
  }

  static getStockItemById(): ValidationChain[] {
    return [param("id").isUUID().withMessage("Invalid stock item ID format")]
  }

  static deleteStockItem(): ValidationChain[] {
    return [param("id").isUUID().withMessage("Invalid stock item ID format")]
  }

  static getStockItems(): ValidationChain[] {
    return [
      query("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer").toInt(),
      query("limit").optional().isInt({ min: 1, max: 100 }).withMessage("Limit must be between 1 and 100").toInt(),
    ]
  }

  static getStockItemsByType(): ValidationChain[] {
    return [
      param("type")
        .notEmpty()
        .withMessage("Type is required")
        .isIn(Object.values(StockItemType))
        .withMessage("Invalid stock item type"),
    ]
  }

  static updateStockQuantity(): ValidationChain[] {
    return [
      param("id").isUUID().withMessage("Invalid stock item ID format"),
      body("quantity")
        .notEmpty()
        .withMessage("Quantity is required")
        .isNumeric()
        .withMessage("Quantity must be a number")
        .custom((value) => {
          if (value < 0) {
            throw new Error("Quantity must be non-negative")
          }
          return true
        }),
    ]
  }
}
