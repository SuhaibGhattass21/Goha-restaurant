import { Router } from "express";
import type { CategoryExtraController } from "../../controllers/Category/category-extra.controller";
export declare class CategoryExtraRoutes {
    private router;
    private categoryExtraController;
    constructor(categoryExtraController: CategoryExtraController);
    private initializeRoutes;
    getRouter(): Router;
}
