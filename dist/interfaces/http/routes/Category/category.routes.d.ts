import { Router } from "express";
import type { CategoryController } from "../../controllers/Category/category.controller";
export declare class CategoryRoutes {
    private router;
    private categoryController;
    constructor(categoryController: CategoryController);
    private initializeRoutes;
    getRouter(): Router;
}
