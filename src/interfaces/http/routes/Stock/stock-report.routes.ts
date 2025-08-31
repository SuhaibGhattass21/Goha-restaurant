import { Router } from "express"
import type { StockReportController } from "../../controllers/Stock/stock-report.controller"
import { validateParamsDto, validateQuery } from "../../middlewares/validation.middleware"
import { DailyStockReportQueryDto, ShiftStockReportParamsDto, ShiftStockReportQueryDto } from "../../../../application/dtos/Stock/stock-report.dto"

export class StockReportRoutes {
  /**
   * @swagger
   * tags:
   *   name: Stock Reports
   *   description: Stock reporting and analytics for end-of-day summaries
   */

  private router: Router
  private stockReportController: StockReportController

  constructor(stockReportController: StockReportController) {
    this.router = Router()
    this.stockReportController = stockReportController
    this.initializeRoutes()
  }

  private initializeRoutes(): void {
    // GET /stock-reports/daily - Get daily stock report
    this.router.get(
      "/daily",
      validateQuery(DailyStockReportQueryDto),
      this.stockReportController.getDailyStockReport.bind(this.stockReportController),
    )

    // GET /stock-reports/shift/:shiftId - Get shift stock report
    this.router.get(
      "/shift/:shiftId",
      validateParamsDto(ShiftStockReportParamsDto),
      validateQuery(ShiftStockReportQueryDto),
      this.stockReportController.getShiftStockReport.bind(this.stockReportController),
    )
  }

  public getRouter(): Router {
    return this.router
  }
}
