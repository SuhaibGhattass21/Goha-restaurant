import { query, param, type ValidationChain } from "express-validator"

export class StockReportValidator {
  static getDailyStockReport(): ValidationChain[] {
    return [
      query("date").optional().isISO8601().withMessage("Date must be in ISO 8601 format (YYYY-MM-DD)"),
      query("shift_id").optional().isUUID().withMessage("Shift ID must be a valid UUID"),
      query("include_low_stock_only").optional().isBoolean().withMessage("include_low_stock_only must be a boolean"),
      query("stock_item_type").optional().isString().withMessage("stock_item_type must be a string"),
    ]
  }

  static getShiftStockReport(): ValidationChain[] {
    return [
      param("shiftId").isUUID().withMessage("Shift ID must be a valid UUID"),
      query("date").optional().isISO8601().withMessage("Date must be in ISO 8601 format (YYYY-MM-DD)"),
      query("include_low_stock_only").optional().isBoolean().withMessage("include_low_stock_only must be a boolean"),
      query("stock_item_type").optional().isString().withMessage("stock_item_type must be a string"),
    ]
  }
}
