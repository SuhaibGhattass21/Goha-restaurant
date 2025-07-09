import type { Request, Response } from "express"
import { validationResult } from "express-validator"
import type { StockReportUseCases } from "../../../../application/use-cases/Stock/stock-report.use-cases"

export class StockReportController {
  constructor(private stockReportUseCases: StockReportUseCases) {}

  async getDailyStockReport(req: Request, res: Response): Promise<void> {
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

      const filters = {
        date: req.query.date as string,
        shift_id: req.query.shift_id as string,
        include_low_stock_only: req.query.include_low_stock_only === "true",
        stock_item_type: req.query.stock_item_type as string,
      }

      const report = await this.stockReportUseCases.generateDailyStockReport(filters)

      res.status(200).json({
        success: true,
        message: "Daily stock report generated successfully",
        data: report,
      })
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }

  async getShiftStockReport(req: Request, res: Response): Promise<void> {
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
      const date = req.query.date ? new Date(req.query.date as string) : new Date()

      const filters = {
        date: req.query.date as string,
        include_low_stock_only: req.query.include_low_stock_only === "true",
        stock_item_type: req.query.stock_item_type as string,
      }

      const report = await this.stockReportUseCases.generateShiftStockReport(shiftId, date, filters)

      res.status(200).json({
        success: true,
        message: "Shift stock report generated successfully",
        data: report,
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
