import { Router } from "express";
import type { CategorySizeController } from "../../controllers/Category/category-size.controller";
export declare class CategorySizeRoutes {
    private router;
    private categorySizeController;
    constructor(categorySizeController: CategorySizeController);
    private initializeRoutes;
    getRouter(): Router;
}
