import { Router } from "express";
import type { ProductSizePriceController } from "../../controllers/Product/product-size-price.controller";
export declare class ProductSizePriceRoutes {
    private router;
    private productSizePriceController;
    constructor(productSizePriceController: ProductSizePriceController);
    private initializeRoutes;
    getRouter(): Router;
}
