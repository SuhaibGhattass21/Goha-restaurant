import type { Request, Response } from "express";
import type { ProductSizePriceUseCases } from "../../../../application/use-cases/Product/product-size-price.use-cases";
export declare class ProductSizePriceController {
    private productSizePriceUseCases;
    constructor(productSizePriceUseCases: ProductSizePriceUseCases);
    createProductSizePrice(req: Request, res: Response): Promise<void>;
    getProductSizePriceById(req: Request, res: Response): Promise<void>;
    getAllProductSizePrices(req: Request, res: Response): Promise<void>;
    getProductSizePricesByProduct(req: Request, res: Response): Promise<void>;
    updateProductSizePrice(req: Request, res: Response): Promise<void>;
    deleteProductSizePrice(req: Request, res: Response): Promise<void>;
}
