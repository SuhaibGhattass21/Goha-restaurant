import { type ValidationChain } from "express-validator";
export declare class CategorySizeValidator {
    static createCategorySize(): ValidationChain[];
    static updateCategorySize(): ValidationChain[];
    static getCategorySizeById(): ValidationChain[];
    static getCategorySizesByCategoryId(): ValidationChain[];
    static deleteCategorySize(): ValidationChain[];
    static getCategorySizes(): ValidationChain[];
}
