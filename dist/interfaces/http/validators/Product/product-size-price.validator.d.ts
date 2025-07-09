import { type ValidationChain } from "express-validator";
export declare class ProductSizePriceValidator {
    static createProductSizePrice(): ValidationChain[];
    static updateProductSizePrice(): ValidationChain[];
    static getProductSizePriceById(): ValidationChain[];
    static deleteProductSizePrice(): ValidationChain[];
    static getProductSizePrices(): ValidationChain[];
    static getProductSizePricesByProduct(): ValidationChain[];
}
