import type { Request, Response } from "express"
import { validationResult } from "express-validator"
import type { StockTransactionUseCases } from "../../../../application/use-cases/Stock/stock-transaction.use-cases"

export class StockTransactionController {
  constructor(private stockTransactionUseCases: StockTransactionUseCases) { }

  async createStockTransaction(req: Request, res: Response): Promise<void> {
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

      const transactionData = req.body
      const transaction = await this.stockTransactionUseCases.createStockTransaction(transactionData)

      res.status(201).json({
        success: true,
        message: "Stock transaction created successfully",
        data: transaction,
      })
    } catch (error: any) {
      if (error.message === "Stock item not found" || error.message === "Insufficient stock quantity") {
        res.status(400).json({
          success: false,
          message: error.message,
        })
        return
      }

      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }

  async getStockTransactionById(req: Request, res: Response): Promise<void> {
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
      const transaction = await this.stockTransactionUseCases.getStockTransactionById(id)

      if (!transaction) {
        res.status(404).json({
          success: false,
          message: "Stock transaction not found",
        })
        return
      }

      res.status(200).json({
        success: true,
        data: transaction,
      })
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }

  async getAllStockTransactions(req: Request, res: Response): Promise<void> {
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

      const result = await this.stockTransactionUseCases.getAllStockTransactions(page, limit)

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

  async updateStockTransaction(req: Request, res: Response): Promise<void> {
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
      const transactionData = req.body

      const transaction = await this.stockTransactionUseCases.updateStockTransaction(id, transactionData)

      if (!transaction) {
        res.status(404).json({
          success: false,
          message: "Stock transaction not found",
        })
        return
      }

      res.status(200).json({
        success: true,
        message: "Stock transaction updated successfully",
        data: transaction,
      })
    } catch (error: any) {
      if (error.message === "Stock item not found" || error.message === "Insufficient stock quantity") {
        res.status(400).json({
          success: false,
          message: error.message,
        })
        return
      }

      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }

  async deleteStockTransaction(req: Request, res: Response): Promise<void> {
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
      const deleted = await this.stockTransactionUseCases.deleteStockTransaction(id)

      if (!deleted) {
        res.status(404).json({
          success: false,
          message: "Stock transaction not found",
        })
        return
      }

      res.status(200).json({
        success: true,
        message: "Stock transaction deleted successfully",
      })
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }

  async getTransactionsByStockItem(req: Request, res: Response): Promise<void> {
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

      const { stockItemId } = req.params
      const transactions = await this.stockTransactionUseCases.getTransactionsByStockItem(stockItemId)

      res.status(200).json({
        success: true,
        data: transactions,
      })
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }

  async getTransactionsByShift(req: Request, res: Response): Promise<void> {
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
      const summary = await this.stockTransactionUseCases.getTransactionsByShift(shiftId)

      res.status(200).json({
        success: true,
        data: summary,
      })
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }

  async getTransactionsByUser(req: Request, res: Response): Promise<void> {
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
      const transactions = await this.stockTransactionUseCases.getTransactionsByUser(userId)

      res.status(200).json({
        success: true,
        data: transactions,
      })
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }

  async getStockItemStats(req: Request, res: Response): Promise<void> {
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

      const { stockItemId } = req.params
      const stats = await this.stockTransactionUseCases.getStockItemStats(stockItemId)

      if (!stats) {
        res.status(404).json({
          success: false,
          message: "No transactions found for this stock item",
        })
        return
      }

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
}
