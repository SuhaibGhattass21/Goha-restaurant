import type { Request, Response } from "express"
import { validationResult } from "express-validator"
import type { CancelledOrderUseCases } from "../../../../application/use-cases/Orders/cancelled-order.use-cases"

export class CancelledOrderController {
  constructor(private cancelledOrderUseCases: CancelledOrderUseCases) { }

  async createCancelledOrder(req: Request, res: Response): Promise<void> {
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

      const cancelledOrderData = req.body
      const cancelledOrder = await this.cancelledOrderUseCases.createCancelledOrder(cancelledOrderData)

      res.status(201).json({
        success: true,
        message: "Cancelled order created successfully",
        data: cancelledOrder,
      })
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }

  async getCancelledOrderById(req: Request, res: Response): Promise<void> {
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
      const cancelledOrder = await this.cancelledOrderUseCases.getCancelledOrderById(id)

      if (!cancelledOrder) {
        res.status(404).json({
          success: false,
          message: "Cancelled order not found",
        })
        return
      }

      res.status(200).json({
        success: true,
        data: cancelledOrder,
      })
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }

  async getCancelledOrderByOrderId(req: Request, res: Response): Promise<void> {
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
      const cancelledOrder = await this.cancelledOrderUseCases.getCancelledOrderByOrderId(orderId)

      if (!cancelledOrder) {
        res.status(404).json({
          success: false,
          message: "Cancelled order for this order ID not found",
        })
        return
      }

      res.status(200).json({
        success: true,
        data: cancelledOrder,
      })
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }

  async getCancelledOrdersByCancelledBy(req: Request, res: Response): Promise<void> {
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

      const { userId } = req.params
      const page = Number.parseInt(req.query.page as string) || 1
      const limit = Number.parseInt(req.query.limit as string) || 10

      const result = await this.cancelledOrderUseCases.getCancelledOrdersByCancelledBy(userId, page, limit)

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

  async getCancelledOrdersByShiftId(req: Request, res: Response): Promise<void> {
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
      const page = Number.parseInt(req.query.page as string) || 1
      const limit = Number.parseInt(req.query.limit as string) || 10

      const result = await this.cancelledOrderUseCases.getCancelledOrdersByShiftId(shiftId, page, limit)

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

  async getAllCancelledOrders(req: Request, res: Response): Promise<void> {
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

      const result = await this.cancelledOrderUseCases.getAllCancelledOrders(page, limit)

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

  async getPendingCancellations(req: Request, res: Response): Promise<void> {
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

      const result = await this.cancelledOrderUseCases.getPendingCancellations(page, limit)

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

  async approveCancellation(req: Request, res: Response): Promise<void> {
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

      const { cancelled_order_id } = req.params
      const { approved_by } = req.body

      const result = await this.cancelledOrderUseCases.approveCancellation({
        cancelled_order_id,
        approved_by,
        status: 'cancelled',
      } as any)

      res.status(200).json({
        success: true,
        message: 'Cancellation approved successfully',
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

  async denyCancellation(req: Request, res: Response): Promise<void> {
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

      const { cancelled_order_id } = req.params
      const { approved_by } = req.body

      const result = await this.cancelledOrderUseCases.approveCancellation({
        cancelled_order_id,
        approved_by,
        status: 'rejected',
      } as any)

      res.status(200).json({
        success: true,
        message: 'Cancellation rejected successfully',
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
}
