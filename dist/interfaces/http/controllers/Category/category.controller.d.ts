import type { Request, Response } from "express";
import type { CategoryUseCases } from "../../../../application/use-cases/Category/category.use-cases";
export declare class CategoryController {
    private categoryUseCases;
    constructor(categoryUseCases: CategoryUseCases);
    createCategory(req: Request, res: Response): Promise<void>;
    getCategoryById(req: Request, res: Response): Promise<void>;
    getAllCategories(req: Request, res: Response): Promise<void>;
    updateCategory(req: Request, res: Response): Promise<void>;
    deleteCategory(req: Request, res: Response): Promise<void>;
}
