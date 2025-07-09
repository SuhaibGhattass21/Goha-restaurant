import { type ValidationChain } from "express-validator";
export declare class ProductValidator {
    static createProduct(): ValidationChain[];
    static updateProduct(): ValidationChain[];
    static getProductById(): ValidationChain[];
    static deleteProduct(): ValidationChain[];
    static getProducts(): ValidationChain[];
    static getProductsByCategory(): ValidationChain[];
}
