import type { IStockReportRepository } from "@domain/repositories/Stock/stock-report.repository.interface"
import type {
  DailyStockReportDto,
  ShiftStockReportDto,
  StockReportItemDto,
  StockReportFiltersDto,
  ShiftStockTransactionSummaryDto,
} from "@application/dtos/Stock/stock-report.dto"

export class StockReportUseCases {
  constructor(private stockReportRepository: IStockReportRepository) {}

  async generateDailyStockReport(filters: StockReportFiltersDto): Promise<DailyStockReportDto> {
    const reportDate = filters.date ? new Date(filters.date) : new Date()

    // Get all shifts for the date
    const shifts = await this.stockReportRepository.getShiftsByDate(reportDate)

    // Get overall stock status
    const allStockItems = await this.stockReportRepository.getAllStockItems()
    const lowStockItems = await this.stockReportRepository.getLowStockItems()
    const outOfStockItems = await this.stockReportRepository.getOutOfStockItems()

    // Generate reports for each shift
    const shiftReports: ShiftStockReportDto[] = []
    let totalTransactions = 0

    for (const shift of shifts) {
      const shiftReport = await this.generateShiftStockReport(shift.shift_id, reportDate, filters)
      shiftReports.push(shiftReport)
      totalTransactions += shiftReport.total_transactions
    }

    // Get critical stock items (very low stock)
    const criticalStockItems = lowStockItems
      .filter((item) => Number.parseFloat(item.current_quantity) <= Number.parseFloat(item.minimum_value) * 0.5)
      .map((item) => this.mapToStockReportItem(item, [], []))

    return {
      report_date: reportDate,
      report_generated_at: new Date().toISOString(),
      total_shifts: shifts.length,
      total_stock_items: allStockItems.length,
      total_low_stock_items: lowStockItems.length,
      total_out_of_stock_items: outOfStockItems.length,
      total_transactions: totalTransactions,
      shift_reports: shiftReports,
      critical_stock_items: criticalStockItems,
    }
  }

  async generateShiftStockReport(
    shiftId: string,
    date: Date,
    filters: StockReportFiltersDto,
  ): Promise<ShiftStockReportDto> {
    // Get stock items with their transactions for this shift
    const stockItemsWithTransactions = await this.stockReportRepository.getStockItemsWithTransactionsByShift(
      shiftId,
      date,
    )

    // Get transaction summary for this shift
    const transactionSummary = await this.stockReportRepository.getStockTransactionsSummaryByShift(shiftId, date)

    // Get low stock and out of stock items
    const lowStockItems = await this.stockReportRepository.getLowStockItems()
    const outOfStockItems = await this.stockReportRepository.getOutOfStockItems()

    // Get shift details
    const shifts = await this.stockReportRepository.getShiftsByDate(date)
    const currentShift = shifts.find((shift) => shift.shift_id === shiftId)

    // Map stock items to report format
    const stockItems = stockItemsWithTransactions.map((item) => {
      const shiftTransactionsForItem = (item.transactions || []).filter(
        (t: any) => t.shift && t.shift.shift_id === shiftId,
      )
      return this.mapToStockReportItem(item, item.transactions || [], shiftTransactionsForItem)
    })

    const lowStockReportItems = lowStockItems.map((item) => {
      const itemTransactions =
        stockItemsWithTransactions.find((si) => si.stock_item_id === item.stock_item_id)?.transactions || []
      const shiftTransactionsForItem = itemTransactions.filter((t: any) => t.shift && t.shift.shift_id === shiftId)
      return this.mapToStockReportItem(item, itemTransactions, shiftTransactionsForItem)
    })

    const outOfStockReportItems = outOfStockItems.map((item) => {
      const itemTransactions =
        stockItemsWithTransactions.find((si) => si.stock_item_id === item.stock_item_id)?.transactions || []
      const shiftTransactionsForItem = itemTransactions.filter((t: any) => t.shift && t.shift.shift_id === shiftId)
      return this.mapToStockReportItem(item, itemTransactions, shiftTransactionsForItem)
    })

    // Map transaction summary
    const mappedTransactionSummary: ShiftStockTransactionSummaryDto[] = transactionSummary.map((summary) => ({
      type: summary.type,
      transaction_count: Number.parseInt(summary.transaction_count),
      total_quantity: Number.parseFloat(summary.total_quantity) || 0,
    }))

    const totalTransactions = mappedTransactionSummary.reduce((sum, summary) => sum + summary.transaction_count, 0)

    return {
      shift_id: shiftId,
      shift_date: date,
      shift_name: currentShift ? `${currentShift.shift_type} Shift` : "Unknown Shift",
      total_stock_items: stockItems.length,
      low_stock_items_count: lowStockReportItems.length,
      out_of_stock_items_count: outOfStockReportItems.length,
      total_transactions: totalTransactions,
      transaction_summary: mappedTransactionSummary,
      stock_items: filters.include_low_stock_only ? lowStockReportItems : stockItems,
      low_stock_items: lowStockReportItems,
      out_of_stock_items: outOfStockReportItems,
    }
  }

  private mapToStockReportItem(stockItem: any, transactions: any[], shiftTransactions: any[]): StockReportItemDto {
    const quantityUsed = shiftTransactions
      .filter((t) => t.type === "out")
      .reduce((sum, t) => sum + Number.parseFloat(t.quantity || 0), 0)

    const quantityAdded = shiftTransactions
      .filter((t) => t.type === "in")
      .reduce((sum, t) => sum + Number.parseFloat(t.quantity || 0), 0)

    const currentQty = Number.parseFloat(stockItem.current_quantity || 0)
    const minValue = Number.parseFloat(stockItem.minimum_value || 0)

    return {
      stock_item_id: stockItem.stock_item_id,
      name: stockItem.name,
      type: stockItem.type,
      unit: stockItem.unit,
      current_quantity: currentQty,
      minimum_value: minValue,
      status: stockItem.status,
      is_low_stock: currentQty <= minValue, // 🔧 FIXED: Now uses parsed numbers
      quantity_used_in_shift: quantityUsed,
      quantity_added_in_shift: quantityAdded,
      net_change_in_shift: quantityAdded - quantityUsed,
    }
  }
}
