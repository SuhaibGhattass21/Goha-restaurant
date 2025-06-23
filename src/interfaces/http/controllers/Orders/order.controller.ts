import type { Request, Response } from "express"
import { validationResult } from "express-validator"
import type { OrderUseCases } from "../../../../application/use-cases/Orders/order.use-cases"
import type { OrderStatus, OrderType } from "../../../../domain/enums/Order.enums"

export class OrderController {
  constructor(private orderUseCases: OrderUseCases) {}

  async createOrder(req: Request, res: Response): Promise<void> {
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

      const orderData = req.body
      const order = await this.orderUseCases.createOrder(orderData)

      res.status(201).json({
        success: true,
        message: "Order created successfully",
        data: order,
      })
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }

  async getOrderById(req: Request, res: Response): Promise<void> {
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
      const order = await this.orderUseCases.getOrderById(id)

      if (!order) {
        res.status(404).json({
          success: false,
          message: "Order not found",
        })
        return
      }

      res.status(200).json({
        success: true,
        data: order,
      })
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }

  async getOrdersByShiftId(req: Request, res: Response): Promise<void> {
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

      const { shiftId } = req.params
      const orders = await this.orderUseCases.getOrdersByShiftId(shiftId)

      res.status(200).json({
        success: true,
        data: orders,
      })
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }

  async getOrdersByCashierId(req: Request, res: Response): Promise<void> {
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

      const { cashierId } = req.params
      const page = Number.parseInt(req.query.page as string) || 1
      const limit = Number.parseInt(req.query.limit as string) || 10

      const result = await this.orderUseCases.getOrdersByCashierId(cashierId, page, limit)

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

  async getOrdersByStatus(req: Request, res: Response): Promise<void> {
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

      const { status } = req.params
      const page = Number.parseInt(req.query.page as string) || 1
      const limit = Number.parseInt(req.query.limit as string) || 10

      const result = await this.orderUseCases.getOrdersByStatus(status as OrderStatus, page, limit)

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

  async getOrdersByType(req: Request, res: Response): Promise<void> {
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

      const { type } = req.params
      const page = Number.parseInt(req.query.page as string) || 1
      const limit = Number.parseInt(req.query.limit as string) || 10

      const result = await this.orderUseCases.getOrdersByType(type as OrderType, page, limit)

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

  async getOrdersByDateRange(req: Request, res: Response): Promise<void> {
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

      const { startDate, endDate } = req.query
      const page = Number.parseInt(req.query.page as string) || 1
      const limit = Number.parseInt(req.query.limit as string) || 10

      const result = await this.orderUseCases.getOrdersByDateRange(
        new Date(startDate as string),
        new Date(endDate as string),
        page,
        limit,
      )

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

  async getAllOrders(req: Request, res: Response): Promise<void> {
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

      const result = await this.orderUseCases.getAllOrders(page, limit)

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

  async updateOrder(req: Request, res: Response): Promise<void> {
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
      const orderData = req.body

      const order = await this.orderUseCases.updateOrder(id, orderData)

      if (!order) {
        res.status(404).json({
          success: false,
          message: "Order not found",
        })
        return
      }

      res.status(200).json({
        success: true,
        message: "Order updated successfully",
        data: order,
      })
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }

  async updateOrderStatus(req: Request, res: Response): Promise<void> {
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
      const { status } = req.body

      const order = await this.orderUseCases.updateOrderStatus(id, status)

      if (!order) {
        res.status(404).json({
          success: false,
          message: "Order not found",
        })
        return
      }

      res.status(200).json({
        success: true,
        message: "Order status updated successfully",
        data: order,
      })
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }

  async deleteOrder(req: Request, res: Response): Promise<void> {
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
      const deleted = await this.orderUseCases.deleteOrder(id)

      if (!deleted) {
        res.status(404).json({
          success: false,
          message: "Order not found",
        })
        return
      }

      res.status(200).json({
        success: true,
        message: "Order deleted successfully",
      })
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }

  async getOrderStats(req: Request, res: Response): Promise<void> {
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

      const { shiftId, startDate, endDate } = req.query

      const stats = await this.orderUseCases.getOrderStats(
        shiftId as string,
        startDate ? new Date(startDate as string) : undefined,
        endDate ? new Date(endDate as string) : undefined,
      )

      res.status(200).json({
        success: true,
        data: stats,
      })
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }

  async recalculateOrderTotal(req: Request, res: Response): Promise<void> {
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
      const total = await this.orderUseCases.recalculateOrderTotal(id)

      res.status(200).json({
        success: true,
        message: "Order total recalculated successfully",
        data: { total_price: total },
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
