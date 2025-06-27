import type { Request, Response } from "express"
import { validationResult } from "express-validator"
import type { OrderItemUseCases } from "../../../../application/use-cases/Orders/order-item.use-cases"

export class OrderItemController {
  constructor(private orderItemUseCases: OrderItemUseCases) {}

  async createOrderItem(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: errors.array(),
        })
        return
      }

      const orderItemData = req.body
      const orderItem = await this.orderItemUseCases.createOrderItem(orderItemData)

      res.status(201).json({
        success: true,
        message: "Order item created successfully",
        data: orderItem,
      })
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }

  async getOrderItemById(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: errors.array(),
        })
        return
      }

      const { id } = req.params
      const orderItem = await this.orderItemUseCases.getOrderItemById(id)

      if (!orderItem) {
        res.status(404).json({
          success: false,
          message: "Order item not found",
        })
        return
      }

      res.status(200).json({
        success: true,
        data: orderItem,
      })
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }

  async getOrderItemsByOrderId(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: errors.array(),
        })
        return
      }

      const { orderId } = req.params
      const orderItems = await this.orderItemUseCases.getOrderItemsByOrderId(orderId)

      res.status(200).json({
        success: true,
        data: orderItems,
      })
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }

  async getAllOrderItems(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: errors.array(),
        })
        return
      }

      const page = Number.parseInt(req.query.page as string) || 1
      const limit = Number.parseInt(req.query.limit as string) || 10

      const result = await this.orderItemUseCases.getAllOrderItems(page, limit)

      res.status(200).json({
        success: true,
        data: result,
      })
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }

  async updateOrderItem(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: errors.array(),
        })
        return
      }

      const { id } = req.params
      const orderItemData = req.body

      const orderItem = await this.orderItemUseCases.updateOrderItem(id, orderItemData)

      if (!orderItem) {
        res.status(404).json({
          success: false,
          message: "Order item not found",
        })
        return
      }

      res.status(200).json({
        success: true,
        message: "Order item updated successfully",
        data: orderItem,
      })
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }

  async deleteOrderItem(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: errors.array(),
        })
        return
      }

      const { id } = req.params
      const deleted = await this.orderItemUseCases.deleteOrderItem(id)

      if (!deleted) {
        res.status(404).json({
          success: false,
          message: "Order item not found",
        })
        return
      }

      res.status(200).json({
        success: true,
        message: "Order item deleted successfully",
      })
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }
}
