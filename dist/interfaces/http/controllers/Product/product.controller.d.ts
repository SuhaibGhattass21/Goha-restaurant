import type { Request, Response } from "express";
import type { ProductUseCases } from "../../../../application/use-cases/Product/product.use-cases";
export declare class ProductController {
    private productUseCases;
    constructor(productUseCases: ProductUseCases);
    createProduct(req: Request, res: Response): Promise<void>;
    getProductById(req: Request, res: Response): Promise<void>;
    getAllProducts(req: Request, res: Response): Promise<void>;
    getProductsByCategory(req: Request, res: Response): Promise<void>;
    updateProduct(req: Request, res: Response): Promise<void>;
    deleteProduct(req: Request, res: Response): Promise<void>;
}
