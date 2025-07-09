import { type ValidationChain } from "express-validator";
export declare class CategoryExtraValidator {
    static createCategoryExtra(): ValidationChain[];
    static updateCategoryExtra(): ValidationChain[];
    static getCategoryExtraById(): ValidationChain[];
    static getCategoryExtrasByCategoryId(): ValidationChain[];
    static deleteCategoryExtra(): ValidationChain[];
    static getCategoryExtras(): ValidationChain[];
}
