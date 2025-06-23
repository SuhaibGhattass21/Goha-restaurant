import { body, param, query, type ValidationChain } from "express-validator"
import { OrderStatus, OrderType } from "../../../../domain/enums/Order.enums"

export class OrderValidator {
  static createOrder(): ValidationChain[] {
    return [
      body("cashier_id").isUUID().withMessage("Cashier ID must be a valid UUID"),
      body("shift_id").isUUID().withMessage("Shift ID must be a valid UUID"),
      body("table_number")
        .optional()
        .isLength({ min: 1, max: 20 })
        .withMessage("Table number must be between 1 and 20 characters")
        .trim(),
      body("order_type")
        .isIn(Object.values(OrderType))
        .withMessage(`Order type must be one of: ${Object.values(OrderType).join(", ")}`),
      body("customer_name")
        .optional()
        .isLength({ min: 1, max: 100 })
        .withMessage("Customer name must be between 1 and 100 characters")
        .trim(),
      body("customer_phone").optional().isMobilePhone("any").withMessage("Customer phone must be a valid phone number"),
      body("items").isArray({ min: 1 }).withMessage("Order must have at least one item"),
      body("items.*.product_size_id").isUUID().withMessage("Product size ID must be a valid UUID"),
      body("items.*.quantity").isInt({ min: 1 }).withMessage("Quantity must be a positive integer"),
      body("items.*.unit_price")
        .isNumeric()
        .custom((value) => {
          if (Number(value) < 0) {
            throw new Error("Unit price must be non-negative")
          }
          return true
        })
        .withMessage("Unit price must be a valid number"),
      body("items.*.special_instructions")
        .optional()
        .isLength({ max: 500 })
        .withMessage("Special instructions must not exceed 500 characters")
        .trim(),
      body("items.*.extras").optional().isArray().withMessage("Extras must be an array"),
      // THIS LINE WAS THE PROBLEM:
      // It was previously 'items.*.extras.*.category_extra_id'
      body("items.*.extras.*.extra_id") // FIXED: Changed to 'extra_id'
        .if(body("items.*.extras").exists())
        .isUUID()
        .withMessage("Extra ID must be a valid UUID"), // Updated message
      body("items.*.extras.*.price")
        .if(body("items.*.extras").exists())
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

  static updateOrder(): ValidationChain[] {
    return [
      param("id").isUUID().withMessage("Invalid order ID format"),
      body("table_number")
        .optional()
        .isLength({ min: 1, max: 20 })
        .withMessage("Table number must be between 1 and 20 characters")
        .trim(),
      body("order_type")
        .optional()
        .isIn(Object.values(OrderType))
        .withMessage(`Order type must be one of: ${Object.values(OrderType).join(", ")}`),
      body("status")
        .optional()
        .isIn(Object.values(OrderStatus))
        .withMessage(`Status must be one of: ${Object.values(OrderStatus).join(", ")}`),
      body("customer_name")
        .optional()
        .isLength({ min: 1, max: 100 })
        .withMessage("Customer name must be between 1 and 100 characters")
        .trim(),
      body("customer_phone").optional().isMobilePhone("any").withMessage("Customer phone must be a valid phone number"),
    ]
  }

  static updateOrderStatus(): ValidationChain[] {
    return [
      param("id").isUUID().withMessage("Invalid order ID format"),
      body("status")
        .isIn(Object.values(OrderStatus))
        .withMessage(`Status must be one of: ${Object.values(OrderStatus).join(", ")}`),
    ]
  }

  static getOrderById(): ValidationChain[] {
    return [param("id").isUUID().withMessage("Invalid order ID format")]
  }

  static getOrdersByShiftId(): ValidationChain[] {
    return [param("shiftId").isUUID().withMessage("Invalid shift ID format")]
  }

  static getOrdersByCashierId(): ValidationChain[] {
    return [
      param("cashierId").isUUID().withMessage("Invalid cashier ID format"),
      query("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer").toInt(),
      query("limit").optional().isInt({ min: 1, max: 100 }).withMessage("Limit must be between 1 and 100").toInt(),
    ]
  }

  static getOrdersByStatus(): ValidationChain[] {
    return [
      param("status")
        .isIn(Object.values(OrderStatus))
        .withMessage(`Status must be one of: ${Object.values(OrderStatus).join(", ")}`),
      query("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer").toInt(),
      query("limit").optional().isInt({ min: 1, max: 100 }).withMessage("Limit must be between 1 and 100").toInt(),
    ]
  }

  static getOrdersByType(): ValidationChain[] {
    return [
      param("type")
        .isIn(Object.values(OrderType))
        .withMessage(`Type must be one of: ${Object.values(OrderType).join(", ")}`),
      query("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer").toInt(),
      query("limit").optional().isInt({ min: 1, max: 100 }).withMessage("Limit must be between 1 and 100").toInt(),
    ]
  }

  static getOrdersByDateRange(): ValidationChain[] {
    return [
      query("startDate").isISO8601().withMessage("Start date must be a valid ISO 8601 date"),
      query("endDate").isISO8601().withMessage("End date must be a valid ISO 8601 date"),
      query("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer").toInt(),
      query("limit").optional().isInt({ min: 1, max: 100 }).withMessage("Limit must be between 1 and 100").toInt(),
    ]
  }

  static deleteOrder(): ValidationChain[] {
    return [param("id").isUUID().withMessage("Invalid order ID format")]
  }

  static getOrders(): ValidationChain[] {
    return [
      query("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer").toInt(),
      query("limit").optional().isInt({ min: 1, max: 100 }).withMessage("Limit must be between 1 and 100").toInt(),
    ]
  }

  static getOrderStats(): ValidationChain[] {
    return [
      query("shiftId").optional().isUUID().withMessage("Shift ID must be a valid UUID"),
      query("startDate").optional().isISO8601().withMessage("Start date must be a valid ISO 8601 date"),
      query("endDate").optional().isISO8601().withMessage("End date must be a valid ISO 8601 date"),
    ]
  }

  static recalculateOrderTotal(): ValidationChain[] {
    return [param("id").isUUID().withMessage("Invalid order ID format")]
  }
}
