export interface IStockReportRepository {
  getShiftsByDate(date: Date): Promise<any[]>
  getStockItemsWithTransactionsByShift(shiftId: string, date: Date): Promise<any[]>
  getStockTransactionsSummaryByShift(shiftId: string, date: Date): Promise<any[]>
  getLowStockItems(): Promise<any[]>
  getOutOfStockItems(): Promise<any[]>
  getAllStockItems(): Promise<any[]>
}
