import type { IStockItemRepository } from "@domain/repositories/SrockItem/stock-item.repository.interface"
import type { StockItem } from "../../../infrastructure/database/models/StockItem.model"
import type {
  CreateStockItemDto,
  StockItemResponseDto,
  StockItemListResponseDto,
  UpdateStockItemDto,
  LowStockItemDto,
} from "@application/dtos/StockItem/stock-item.dto"

export class StockItemUseCases {
  constructor(private stockItemRepository: IStockItemRepository) {}

  async createStockItem(stockItemData: CreateStockItemDto): Promise<StockItemResponseDto> {
    // Check if stock item with same name already exists
    const existingStockItem = await this.stockItemRepository.findByName(stockItemData.name)
    if (existingStockItem) {
      throw new Error("Stock item with this name already exists")
    }

    const stockItem = await this.stockItemRepository.create(stockItemData)
    return this.mapToResponseDto(stockItem)
  }

  async getStockItemById(id: string): Promise<StockItemResponseDto | null> {
    const stockItem = await this.stockItemRepository.findById(id)
    return stockItem ? this.mapToResponseDto(stockItem) : null
  }

  async getAllStockItems(page = 1, limit = 10): Promise<StockItemListResponseDto> {
    const { stockItems, total } = await this.stockItemRepository.findAll(page, limit)

    return {
      stockItems: stockItems.map((stockItem: any) => this.mapToResponseDto(stockItem)),
      total,
      page,
      limit,
    }
  }

  async updateStockItem(id: string, stockItemData: UpdateStockItemDto): Promise<StockItemResponseDto | null> {
    // If name is being updated, check for duplicates
    if (stockItemData.name) {
      const existingStockItem = await this.stockItemRepository.findByName(stockItemData.name)
      if (existingStockItem && existingStockItem.stock_item_id !== id) {
        throw new Error("Stock item with this name already exists")
      }
    }

    const stockItem = await this.stockItemRepository.update(id, stockItemData)
    return stockItem ? this.mapToResponseDto(stockItem) : null
  }

  async deleteStockItem(id: string): Promise<boolean> {
    const stockItem = await this.stockItemRepository.findById(id)
    if (!stockItem) {
      return false
    }

    return await this.stockItemRepository.delete(id)
  }

  async getLowStockItems(): Promise<LowStockItemDto[]> {
    const lowStockItems = await this.stockItemRepository.findLowStockItems()
    return lowStockItems.map((item) => ({
      stock_item_id: item.stock_item_id,
      name: item.name,
      current_quantity: item.current_quantity,
      minimum_value: item.minimum_value,
      unit: item.unit,
    }))
  }

  async getStockItemsByType(type: string): Promise<StockItemResponseDto[]> {
    const stockItems = await this.stockItemRepository.findByType(type)
    return stockItems.map((stockItem) => this.mapToResponseDto(stockItem))
  }

  async updateStockQuantity(id: string, quantity: number): Promise<StockItemResponseDto | null> {
    const stockItem = await this.stockItemRepository.updateQuantity(id, quantity)
    return stockItem ? this.mapToResponseDto(stockItem) : null
  }

  private mapToResponseDto(stockItem: StockItem): StockItemResponseDto {
    return {
      stock_item_id: stockItem.stock_item_id,
      name: stockItem.name,
      type: stockItem.type,
      unit: stockItem.unit,
      current_quantity: stockItem.current_quantity,
      minimum_value: stockItem.minimum_value,
      status: stockItem.status,
      last_updated_at: stockItem.last_updated_at,
      transactions:
        stockItem.transactions?.map((transaction) => ({
          transaction_id: transaction.transaction_id,
          type: transaction.type,
          quantity: transaction.quantity,
          timestamp: transaction.timestamp,
        })) || [],
    }
  }
}
