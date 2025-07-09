import type { Request, Response } from "express";
import type { CategorySizeUseCases } from "../../../../application/use-cases/Category/category-size.use-cases";
export declare class CategorySizeController {
    private categorySizeUseCases;
    constructor(categorySizeUseCases: CategorySizeUseCases);
    createCategorySize(req: Request, res: Response): Promise<void>;
    getCategorySizeById(req: Request, res: Response): Promise<void>;
    getCategorySizesByCategoryId(req: Request, res: Response): Promise<void>;
    getAllCategorySizes(req: Request, res: Response): Promise<void>;
    updateCategorySize(req: Request, res: Response): Promise<void>;
    deleteCategorySize(req: Request, res: Response): Promise<void>;
}
