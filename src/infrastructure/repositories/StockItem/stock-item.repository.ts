import type { Repository } from "typeorm"
import type { StockItem } from "../../database/models/StockItem.model"
import type { CreateStockItemDto, UpdateStockItemDto } from "../../../application/dtos/StockItem/stock-item.dto"
import type { IStockItemRepository } from "@domain/repositories/SrockItem/stock-item.repository.interface"

export class StockItemRepositoryImpl implements IStockItemRepository {
  constructor(private stockItemRepository: Repository<StockItem>) {}

  async create(stockItemData: CreateStockItemDto): Promise<StockItem> {
    const stockItem = this.stockItemRepository.create({
      ...stockItemData,
      last_updated_at: new Date(),
    })
    return await this.stockItemRepository.save(stockItem)
  }

  async findById(id: string): Promise<StockItem | null> {
    return await this.stockItemRepository.findOne({
      where: { stock_item_id: id },
      relations: ["transactions"],
    })
  }

  async findByName(name: string): Promise<StockItem | null> {
    return await this.stockItemRepository.findOne({
      where: { name },
    })
  }

  async findAll(page = 1, limit = 10): Promise<{ stockItems: StockItem[]; total: number }> {
    const [stockItems, total] = await this.stockItemRepository.findAndCount({
      relations: ["transactions"],
      skip: (page - 1) * limit,
      take: limit,
      order: { name: "ASC" },
    })

    return { stockItems, total }
  }

  async findByType(type: string): Promise<StockItem[]> {
    return await this.stockItemRepository.find({
      where: { type: type as any },
      relations: ["transactions"],
      order: { name: "ASC" },
    })
  }

  async findLowStockItems(): Promise<StockItem[]> {
    return await this.stockItemRepository
      .createQueryBuilder("stock_item")
      .where("stock_item.current_quantity <= stock_item.minimum_value")
      .orderBy("stock_item.name", "ASC")
      .getMany()
  }

  async update(id: string, stockItemData: UpdateStockItemDto): Promise<StockItem | null> {
    await this.stockItemRepository.update(id, {
      ...stockItemData,
      last_updated_at: new Date(),
    })
    return await this.findById(id)
  }

  async updateQuantity(id: string, quantity: number): Promise<StockItem | null> {
    await this.stockItemRepository.update(id, {
      current_quantity: quantity,
      last_updated_at: new Date(),
    })
    return await this.findById(id)
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.stockItemRepository.delete(id)
    return (result.affected ?? 0) > 0
  }
}
