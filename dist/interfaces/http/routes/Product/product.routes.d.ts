import { Router } from "express";
import type { ProductController } from "../../controllers/Product/product.controller";
export declare class ProductRoutes {
    private router;
    private productController;
    constructor(productController: ProductController);
    private initializeRoutes;
    getRouter(): Router;
}
