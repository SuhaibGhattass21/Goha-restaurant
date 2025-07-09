import { type ValidationChain } from "express-validator";
export declare class StockTransactionValidator {
    static createStockTransaction(): ValidationChain[];
    static updateStockTransaction(): ValidationChain[];
    static getStockTransactionById(): ValidationChain[];
    static deleteStockTransaction(): ValidationChain[];
    static getStockTransactions(): ValidationChain[];
    static getTransactionsByStockItem(): ValidationChain[];
    static getTransactionsByShift(): ValidationChain[];
    static getTransactionsByUser(): ValidationChain[];
    static getStockItemStats(): ValidationChain[];
}
