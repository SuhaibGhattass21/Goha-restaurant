import type { Repository } from "typeorm"
import type { StockItem, StockTransaction, Shift } from "../../database/models"
import type { IStockReportRepository } from "@domain/repositories/Stock/stock-report.repository.interface"

export class StockReportRepositoryImpl implements IStockReportRepository {
  constructor(
    private stockItemRepository: Repository<StockItem>,
    private stockTransactionRepository: Repository<StockTransaction>,
    private shiftRepository: Repository<Shift>,
  ) {}

  async getShiftsByDate(date: Date): Promise<any[]> {
    const startOfDay = new Date(date)
    startOfDay.setHours(0, 0, 0, 0)

    const endOfDay = new Date(date)
    endOfDay.setHours(23, 59, 59, 999)

    return await this.shiftRepository
      .createQueryBuilder("shift")
      .leftJoinAndSelect("shift.opened_by", "opened_by")
      .leftJoinAndSelect("shift.closed_by", "closed_by")
      .where("DATE(shift.created_at) = DATE(:date)", { date })
      .orWhere("shift.start_time BETWEEN :startOfDay AND :endOfDay", { startOfDay, endOfDay })
      .orderBy("shift.start_time", "ASC")
      .getMany()
  }
  // 🆕 NEW: Add this method
async getTransactionsByShift(shiftId: string, date: Date): Promise<any[]> {
  const startOfDay = new Date(date)
  startOfDay.setHours(0, 0, 0, 0)

  const endOfDay = new Date(date)
  endOfDay.setHours(23, 59, 59, 999)

  return await this.stockTransactionRepository
    .createQueryBuilder("transaction")
    .leftJoinAndSelect("transaction.stockItem", "stockItem")
    .leftJoinAndSelect("transaction.admin", "admin")
    .leftJoinAndSelect("transaction.shift", "shift")
    .where("transaction.shift_id = :shiftId", { shiftId })
    .andWhere("transaction.timestamp BETWEEN :startDate AND :endDate", {
      startDate: startOfDay,
      endDate: endOfDay,
    })
    .orderBy("transaction.timestamp", "DESC")
    .getMany()
}

  async getStockItemsWithTransactionsByShift(shiftId: string, date: Date): Promise<any[]> {
    const startOfDay = new Date(date)
    startOfDay.setHours(0, 0, 0, 0)

    const endOfDay = new Date(date)
    endOfDay.setHours(23, 59, 59, 999)

    return await this.stockItemRepository
      .createQueryBuilder("stock_item")
      .leftJoinAndSelect(
        "stock_item.transactions",
        "transaction",
        "transaction.shift_id = :shiftId AND transaction.timestamp BETWEEN :startDate AND :endDate",
        { shiftId, startDate: startOfDay, endDate: endOfDay },
      )
      .getMany()
  }

  async getStockTransactionsSummaryByShift(shiftId: string, date: Date): Promise<any[]> {
    const startOfDay = new Date(date)
    startOfDay.setHours(0, 0, 0, 0)

    const endOfDay = new Date(date)
    endOfDay.setHours(23, 59, 59, 999)

    return await this.stockTransactionRepository
      .createQueryBuilder("transaction")
      .select("transaction.type", "type")
      .addSelect("COUNT(*)", "transaction_count")
      .addSelect("SUM(transaction.quantity)", "total_quantity")
      .where("transaction.shift_id = :shiftId", { shiftId })
      .andWhere("transaction.timestamp BETWEEN :startDate AND :endDate", {
        startDate: startOfDay,
        endDate: endOfDay,
      })
      .groupBy("transaction.type")
      .getRawMany()
  }

  async getLowStockItems(): Promise<any[]> {
    return await this.stockItemRepository
      .createQueryBuilder("stock_item")
      .where("stock_item.current_quantity <= stock_item.minimum_value")
      .andWhere("stock_item.current_quantity > 0")
      .orderBy("stock_item.name", "ASC")
      .getMany()
  }

  async getOutOfStockItems(): Promise<any[]> {
    return await this.stockItemRepository
      .createQueryBuilder("stock_item")
      .where("stock_item.current_quantity = 0")
      .orderBy("stock_item.name", "ASC")
      .getMany()
  }

  async getAllStockItems(): Promise<any[]> {
    return await this.stockItemRepository.createQueryBuilder("stock_item").orderBy("stock_item.name", "ASC").getMany()
  }
}
