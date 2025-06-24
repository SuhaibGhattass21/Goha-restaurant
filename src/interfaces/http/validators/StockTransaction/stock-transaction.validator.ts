import { body, param, query, type ValidationChain } from "express-validator"
import { StockTransactionType } from "../../../../domain/enums/Stock.enums"

export class StockTransactionValidator {
  static createStockTransaction(): ValidationChain[] {
    return [
      body("stock_item_id")
        .notEmpty()
        .withMessage("Stock item ID is required")
        .isUUID()
        .withMessage("Stock item ID must be a valid UUID"),
      body("type")
        .notEmpty()
        .withMessage("Transaction type is required")
        .isIn(Object.values(StockTransactionType))
        .withMessage("Invalid transaction type"),
      body("quantity")
        .notEmpty()
        .withMessage("Quantity is required")
        .isNumeric()
        .withMessage("Quantity must be a number")
        .custom((value) => {
          if (value <= 0) {
            throw new Error("Quantity must be greater than 0")
          }
          return true
        }),
      body("user_id")
        .notEmpty()
        .withMessage("User ID is required")
        .isUUID()
        .withMessage("User ID must be a valid UUID"),
      body("shift_id")
        .notEmpty()
        .withMessage("Shift ID is required")
        .isUUID()
        .withMessage("Shift ID must be a valid UUID"),
    ]
  }

  static updateStockTransaction(): ValidationChain[] {
    return [
      param("id").isUUID().withMessage("Invalid stock transaction ID format"),
      body("stock_item_id").optional().isUUID().withMessage("Stock item ID must be a valid UUID"),
      body("type").optional().isIn(Object.values(StockTransactionType)).withMessage("Invalid transaction type"),
      body("quantity")
        .optional()
        .isNumeric()
        .withMessage("Quantity must be a number")
        .custom((value) => {
          if (value <= 0) {
            throw new Error("Quantity must be greater than 0")
          }
          return true
        }),
      body("user_id").optional().isUUID().withMessage("User ID must be a valid UUID"),
      body("shift_id").optional().isUUID().withMessage("Shift ID must be a valid UUID"),
    ]
  }

  static getStockTransactionById(): ValidationChain[] {
    return [param("id").isUUID().withMessage("Invalid stock transaction ID format")]
  }

  static deleteStockTransaction(): ValidationChain[] {
    return [param("id").isUUID().withMessage("Invalid stock transaction ID format")]
  }

  static getStockTransactions(): ValidationChain[] {
    return [
      query("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer").toInt(),
      query("limit").optional().isInt({ min: 1, max: 100 }).withMessage("Limit must be between 1 and 100").toInt(),
    ]
  }

  static getTransactionsByStockItem(): ValidationChain[] {
    return [param("stockItemId").isUUID().withMessage("Invalid stock item ID format")]
  }

  static getTransactionsByShift(): ValidationChain[] {
    return [param("shiftId").isUUID().withMessage("Invalid shift ID format")]
  }

  static getTransactionsByUser(): ValidationChain[] {
    return [param("userId").isUUID().withMessage("Invalid user ID format")]
  }

  static getStockItemStats(): ValidationChain[] {
    return [param("stockItemId").isUUID().withMessage("Invalid stock item ID format")]
  }
}
