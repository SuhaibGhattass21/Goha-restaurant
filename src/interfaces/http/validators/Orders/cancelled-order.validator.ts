import { body, param, query, type ValidationChain } from "express-validator"

export class CancelledOrderValidator {
  static createCancelledOrder(): ValidationChain[] {
    return [
      body("order_id").isUUID().withMessage("Order ID must be a valid UUID"),
      body("cancelled_by").isUUID().withMessage("Cancelled By User ID must be a valid UUID"),
      body("shift_id").isUUID().withMessage("Shift ID must be a valid UUID"),
      body("reason").optional().isLength({ max: 500 }).withMessage("Reason must not exceed 500 characters").trim(),
    ]
  }

  static getCancelledOrderById(): ValidationChain[] {
    return [param("id").isUUID().withMessage("Invalid cancelled order ID format")]
  }

  static getCancelledOrderByOrderId(): ValidationChain[] {
    return [param("orderId").isUUID().withMessage("Invalid order ID format")]
  }

  static getCancelledOrdersByCancelledBy(): ValidationChain[] {
    return [
      param("userId").isUUID().withMessage("Invalid user ID format"),
      query("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer").toInt(),
      query("limit").optional().isInt({ min: 1, max: 100 }).withMessage("Limit must be between 1 and 100").toInt(),
    ]
  }

  static getCancelledOrdersByShiftId(): ValidationChain[] {
    return [
      param("shiftId").isUUID().withMessage("Invalid shift ID format"),
      query("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer").toInt(),
      query("limit").optional().isInt({ min: 1, max: 100 }).withMessage("Limit must be between 1 and 100").toInt(),
    ]
  }

  static getCancelledOrders(): ValidationChain[] {
    return [
      query("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer").toInt(),
      query("limit").optional().isInt({ min: 1, max: 100 }).withMessage("Limit must be between 1 and 100").toInt(),
    ]
  }

  static approveCancellation(): ValidationChain[] {
    return [
      param("cancelled_order_id").isUUID().withMessage("Invalid cancelled order ID format"),
      body("approved_by").isUUID().withMessage("Approved By User ID must be a valid UUID"),
    ]
  }

  static denyCancellation(): ValidationChain[] {
    return [
      param("cancelled_order_id").isUUID().withMessage("Invalid cancelled order ID format"),
      body("approved_by").isUUID().withMessage("Approved By User ID must be a valid UUID"),
    ]
  }

  static getPendingCancellations(): ValidationChain[] {
    return [
      query("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer").toInt(),
      query("limit").optional().isInt({ min: 1, max: 100 }).withMessage("Limit must be between 1 and 100").toInt(),
    ]
  }
}
