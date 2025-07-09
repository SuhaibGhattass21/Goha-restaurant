"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockTransactionUseCases = void 0;
class StockTransactionUseCases {
    constructor(stockTransactionRepository, stockItemRepository) {
        this.stockTransactionRepository = stockTransactionRepository;
        this.stockItemRepository = stockItemRepository;
    }
    async createStockTransaction(transactionData) {
        // Verify stock item exists
        const stockItem = await this.stockItemRepository.findById(transactionData.stock_item_id);
        if (!stockItem) {
            throw new Error("Stock item not found");
        }
        // Create transaction
        const transaction = await this.stockTransactionRepository.create(transactionData);
        // Update stock item quantity
        const quantity = Number(transactionData.quantity);
        const newQuantity = transactionData.type === "in"
            ? Number(stockItem.current_quantity) + quantity
            : Number(stockItem.current_quantity) - quantity;
        if (newQuantity < 0) {
            throw new Error("Insufficient stock quantity");
        }
        await this.stockItemRepository.updateQuantity(transactionData.stock_item_id, newQuantity);
        return this.mapToResponseDto(transaction);
    }
    async getStockTransactionById(id) {
        const transaction = await this.stockTransactionRepository.findById(id);
        return transaction ? this.mapToResponseDto(transaction) : null;
    }
    async getAllStockTransactions(page = 1, limit = 10) {
        const { transactions, total } = await this.stockTransactionRepository.findAll(page, limit);
        return {
            transactions: transactions.map((transaction) => this.mapToResponseDto(transaction)),
            total,
            page,
            limit,
        };
    }
    async updateStockTransaction(id, transactionData) {
        const existingTransaction = await this.stockTransactionRepository.findById(id);
        if (!existingTransaction) {
            return null;
        }
        // If quantity or type is being updated, we need to adjust stock levels
        if (transactionData.quantity !== undefined || transactionData.type !== undefined) {
            const stockItem = await this.stockItemRepository.findById(existingTransaction.stockItem.stock_item_id);
            if (!stockItem) {
                throw new Error("Stock item not found");
            }
            // Convert to numbers to ensure proper arithmetic
            const currentStockQuantity = Number(stockItem.current_quantity);
            const originalQuantity = Number(existingTransaction.quantity);
            const newQuantity = transactionData.quantity !== undefined ? Number(transactionData.quantity) : originalQuantity;
            const newType = transactionData.type || existingTransaction.type;
            const originalType = existingTransaction.type;
            // Reverse the original transaction effect
            let reversalEffect = 0;
            if (originalType === "in") {
                reversalEffect = -originalQuantity;
            }
            else {
                reversalEffect = originalQuantity;
            }
            // Apply new transaction effect
            let newEffect = 0;
            if (newType === "in") {
                newEffect = newQuantity;
            }
            else {
                newEffect = -newQuantity;
            }
            const updatedStockQuantity = currentStockQuantity + reversalEffect + newEffect;
            if (updatedStockQuantity < 0) {
                throw new Error("Insufficient stock quantity");
            }
            await this.stockItemRepository.updateQuantity(existingTransaction.stockItem.stock_item_id, updatedStockQuantity);
        }
        const transaction = await this.stockTransactionRepository.update(id, transactionData);
        return transaction ? this.mapToResponseDto(transaction) : null;
    }
    async deleteStockTransaction(id) {
        const transaction = await this.stockTransactionRepository.findById(id);
        if (!transaction) {
            return false;
        }
        // Reverse the transaction effect on stock quantity
        const stockItem = await this.stockItemRepository.findById(transaction.stockItem.stock_item_id);
        if (stockItem) {
            const currentQuantity = Number(stockItem.current_quantity);
            const transactionQuantity = Number(transaction.quantity);
            const reversalEffect = transaction.type === "in" ? -transactionQuantity : transactionQuantity;
            const newQuantity = currentQuantity + reversalEffect;
            if (newQuantity >= 0) {
                await this.stockItemRepository.updateQuantity(transaction.stockItem.stock_item_id, newQuantity);
            }
        }
        return await this.stockTransactionRepository.delete(id);
    }
    async getTransactionsByStockItem(stockItemId) {
        const transactions = await this.stockTransactionRepository.findByStockItem(stockItemId);
        return transactions.map((transaction) => this.mapToResponseDto(transaction));
    }
    async getTransactionsByShift(shiftId) {
        const transactions = await this.stockTransactionRepository.findByShift(shiftId);
        const transactionDtos = transactions.map((transaction) => this.mapToResponseDto(transaction));
        const totalIn = transactions.filter((t) => t.type === "in").reduce((sum, t) => sum + Number(t.quantity), 0);
        const totalOut = transactions.filter((t) => t.type === "out").reduce((sum, t) => sum + Number(t.quantity), 0);
        return {
            shift_id: shiftId,
            total_transactions: transactions.length,
            total_in_quantity: totalIn,
            total_out_quantity: totalOut,
            transactions: transactionDtos,
        };
    }
    async getTransactionsByUser(userId) {
        const transactions = await this.stockTransactionRepository.findByUser(userId);
        return transactions.map((transaction) => this.mapToResponseDto(transaction));
    }
    async getStockItemStats(stockItemId) {
        const transactions = await this.stockTransactionRepository.findByStockItem(stockItemId);
        if (transactions.length === 0) {
            return null;
        }
        const stockItem = transactions[0].stockItem;
        const totalIn = transactions.filter((t) => t.type === "in").reduce((sum, t) => sum + Number(t.quantity), 0);
        const totalOut = transactions.filter((t) => t.type === "out").reduce((sum, t) => sum + Number(t.quantity), 0);
        return {
            stock_item_id: stockItemId,
            stock_item_name: stockItem.name,
            total_in: totalIn,
            total_out: totalOut,
            net_change: totalIn - totalOut,
            transaction_count: transactions.length,
        };
    }
    mapToResponseDto(transaction) {
        return {
            transaction_id: transaction.transaction_id,
            stock_item_id: transaction.stockItem.stock_item_id,
            stock_item_name: transaction.stockItem.name,
            type: transaction.type,
            quantity: Number(transaction.quantity), // Ensure it's a number
            user_id: transaction.admin.id,
            user_name: transaction.admin.fullName,
            shift_id: transaction.shift.shift_id,
            timestamp: transaction.timestamp,
        };
    }
}
exports.StockTransactionUseCases = StockTransactionUseCases;
//# sourceMappingURL=stock-transaction.use-cases.js.map