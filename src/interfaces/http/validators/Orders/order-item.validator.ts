import { body, param, query, type ValidationChain } from "express-validator"

export class OrderItemValidator {
  static createOrderItem(): ValidationChain[] {
    return [
      body("order_id").isUUID().withMessage("Order ID must be a valid UUID"),
      body("product_size_id").isUUID().withMessage("Product size ID must be a valid UUID"),
      body("quantity").isInt({ min: 1 }).withMessage("Quantity must be a positive integer"),
      body("unit_price")
        .isNumeric()
        .custom((value) => {
          if (Number(value) < 0) {
            throw new Error("Unit price must be non-negative")
          }
          return true
        })
        .withMessage("Unit price must be a valid number"),
      body("special_instructions")
        .optional()
        .isLength({ max: 500 })
        .withMessage("Special instructions must not exceed 500 characters")
        .trim(),
      body("extras").optional().isArray().withMessage("Extras must be an array"),
      body("extras.*.extra_id") // Fixed: using extra_id
        .if(body("extras").exists())
        .isUUID()
        .withMessage("Extra ID must be a valid UUID"),
      body("extras.*.price")
        .if(body("extras").exists())
        .isNumeric()
        .custom((value) => {
          if (Number(value) < 0) {
            throw new Error("Extra price must be non-negative")
          }
          return true
        })
        .withMessage("Extra price must be a valid number"),
    ]
  }

  static updateOrderItem(): ValidationChain[] {
    return [
      param("id").isUUID().withMessage("Invalid order item ID format"),
      body("product_size_id").optional().isUUID().withMessage("Product size ID must be a valid UUID"),
      body("quantity").optional().isInt({ min: 1 }).withMessage("Quantity must be a positive integer"),
      body("unit_price")
        .optional()
        .isNumeric()
        .custom((value) => {
          if (Number(value) < 0) {
            throw new Error("Unit price must be non-negative")
          }
          return true
        })
        .withMessage("Unit price must be a valid number"),
      body("special_instructions")
        .optional()
        .isLength({ max: 500 })
        .withMessage("Special instructions must not exceed 500 characters")
        .trim(),
    ]
  }

  static getOrderItemById(): ValidationChain[] {
    return [param("id").isUUID().withMessage("Invalid order item ID format")]
  }

  static getOrderItemsByOrderId(): ValidationChain[] {
    return [param("orderId").isUUID().withMessage("Invalid order ID format")]
  }

  static deleteOrderItem(): ValidationChain[] {
    return [param("id").isUUID().withMessage("Invalid order item ID format")]
  }

  static getOrderItems(): ValidationChain[] {
    return [
      query("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer").toInt(),
      query("limit").optional().isInt({ min: 1, max: 100 }).withMessage("Limit must be between 1 and 100").toInt(),
    ]
  }
}
