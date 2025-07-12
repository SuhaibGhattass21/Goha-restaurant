import { type ValidationChain } from "express-validator";
export declare class CategoryValidator {
    static createCategory(): ValidationChain[];
    static updateCategory(): ValidationChain[];
    static getCategoryById(): ValidationChain[];
    static deleteCategory(): ValidationChain[];
    static getCategories(): ValidationChain[];
}
