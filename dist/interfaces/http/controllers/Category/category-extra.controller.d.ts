import type { Request, Response } from "express";
import type { CategoryExtraUseCases } from "../../../../application/use-cases/Category/category-extra.use-cases";
export declare class CategoryExtraController {
    private categoryExtraUseCases;
    constructor(categoryExtraUseCases: CategoryExtraUseCases);
    createCategoryExtra(req: Request, res: Response): Promise<void>;
    getCategoryExtraById(req: Request, res: Response): Promise<void>;
    getCategoryExtrasByCategoryId(req: Request, res: Response): Promise<void>;
    getAllCategoryExtras(req: Request, res: Response): Promise<void>;
    updateCategoryExtra(req: Request, res: Response): Promise<void>;
    deleteCategoryExtra(req: Request, res: Response): Promise<void>;
}
