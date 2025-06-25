import type { Repository } from "typeorm"
import type { StockTransaction } from "../../database/models/StockTransaction.model"
import type {
  CreateStockTransactionDto,
  UpdateStockTransactionDto,
} from "../../../application/dtos/StockTransaction/stock-transaction.dto"
import type { IStockTransactionRepository } from "@domain/repositories/StockTransaction/stock-transaction.repository.interface"

export class StockTransactionRepositoryImpl implements IStockTransactionRepository {
  constructor(private stockTransactionRepository: Repository<StockTransaction>) {}

  async create(transactionData: CreateStockTransactionDto): Promise<StockTransaction> {
    const transaction = this.stockTransactionRepository.create({
      stockItem: { stock_item_id: transactionData.stock_item_id },
      type: transactionData.type,
      quantity: transactionData.quantity,
      admin: { id: transactionData.user_id },
      shift: { shift_id: transactionData.shift_id },
    })
    return await this.stockTransactionRepository.save(transaction)
  }

  async findById(id: string): Promise<StockTransaction | null> {
    return await this.stockTransactionRepository.findOne({
      where: { transaction_id: id },
      relations: ["stockItem", "admin", "shift"],
    })
  }

  async findAll(page = 1, limit = 10): Promise<{ transactions: StockTransaction[]; total: number }> {
    const [transactions, total] = await this.stockTransactionRepository.findAndCount({
      relations: ["stockItem", "admin", "shift"],
      skip: (page - 1) * limit,
      take: limit,
      order: { timestamp: "DESC" },
    })

    return { transactions, total }
  }

  async findByStockItem(stockItemId: string): Promise<StockTransaction[]> {
    return await this.stockTransactionRepository.find({
      where: { stockItem: { stock_item_id: stockItemId } },
      relations: ["stockItem", "admin", "shift"],
      order: { timestamp: "DESC" },
    })
  }

  async findByShift(shiftId: string): Promise<StockTransaction[]> {
    return await this.stockTransactionRepository.find({
      where: { shift: { shift_id: shiftId } },
      relations: ["stockItem", "admin", "shift"],
      order: { timestamp: "DESC" },
    })
  }

  async findByUser(userId: string): Promise<StockTransaction[]> {
    return await this.stockTransactionRepository.find({
      where: { admin: { id: userId } },
      relations: ["stockItem", "admin", "shift"],
      order: { timestamp: "DESC" },
    })
  }

  async findByType(type: string): Promise<StockTransaction[]> {
    return await this.stockTransactionRepository.find({
      where: { type: type as any },
      relations: ["stockItem", "admin", "shift"],
      order: { timestamp: "DESC" },
    })
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<StockTransaction[]> {
    return await this.stockTransactionRepository
      .createQueryBuilder("transaction")
      .leftJoinAndSelect("transaction.stockItem", "stockItem")
      .leftJoinAndSelect("transaction.admin", "admin")
      .leftJoinAndSelect("transaction.shift", "shift")
      .where("transaction.timestamp >= :startDate", { startDate })
      .andWhere("transaction.timestamp <= :endDate", { endDate })
      .orderBy("transaction.timestamp", "DESC")
      .getMany()
  }

  async update(id: string, transactionData: UpdateStockTransactionDto): Promise<StockTransaction | null> {
    const updateData: any = { ...transactionData }

    if (transactionData.stock_item_id) {
      updateData.stockItem = { stock_item_id: transactionData.stock_item_id }
      delete updateData.stock_item_id
    }

    if (transactionData.user_id) {
      updateData.admin = { id: transactionData.user_id }
      delete updateData.user_id
    }

    if (transactionData.shift_id) {
      updateData.shift = { shift_id: transactionData.shift_id }
      delete updateData.shift_id
    }

    await this.stockTransactionRepository.update(id, updateData)
    return await this.findById(id)
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.stockTransactionRepository.delete(id)
    return (result.affected ?? 0) > 0
  }
}
