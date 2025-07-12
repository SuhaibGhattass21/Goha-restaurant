import { type ValidationChain } from "express-validator";
export declare class StockItemValidator {
    static createStockItem(): ValidationChain[];
    static updateStockItem(): ValidationChain[];
    static getStockItemById(): ValidationChain[];
    static deleteStockItem(): ValidationChain[];
    static getStockItems(): ValidationChain[];
    static getStockItemsByType(): ValidationChain[];
    static updateStockQuantity(): ValidationChain[];
}
