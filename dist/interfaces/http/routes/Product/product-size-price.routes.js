"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSizePriceRoutes = void 0;
const express_1 = require("express");
const product_size_price_validator_1 = require("../../validators/Product/product-size-price.validator");
class ProductSizePriceRoutes {
    constructor(productSizePriceController) {
        this.router = (0, express_1.Router)();
        this.productSizePriceController = productSizePriceController;
        this.initializeRoutes();
    }
    initializeRoutes() {
        // POST /product-size-prices - Create a new product size price
        this.router.post("/", product_size_price_validator_1.ProductSizePriceValidator.createProductSizePrice(), this.productSizePriceController.createProductSizePrice.bind(this.productSizePriceController));
        // GET /product-size-prices - Get all product size prices with pagination
        this.router.get("/", product_size_price_validator_1.ProductSizePriceValidator.getProductSizePrices(), this.productSizePriceController.getAllProductSizePrices.bind(this.productSizePriceController));
        // GET /product-size-prices/product/:productId - Get product size prices by product
        this.router.get("/product/:productId", product_size_price_validator_1.ProductSizePriceValidator.getProductSizePricesByProduct(), this.productSizePriceController.getProductSizePricesByProduct.bind(this.productSizePriceController));
        // GET /product-size-prices/:id - Get product size price by ID
        this.router.get("/:id", product_size_price_validator_1.ProductSizePriceValidator.getProductSizePriceById(), this.productSizePriceController.getProductSizePriceById.bind(this.productSizePriceController));
        // PUT /product-size-prices/:id - Update product size price
        this.router.put("/:id", product_size_price_validator_1.ProductSizePriceValidator.updateProductSizePrice(), this.productSizePriceController.updateProductSizePrice.bind(this.productSizePriceController));
        // DELETE /product-size-prices/:id - Delete product size price
        this.router.delete("/:id", product_size_price_validator_1.ProductSizePriceValidator.deleteProductSizePrice(), this.productSizePriceController.deleteProductSizePrice.bind(this.productSizePriceController));
    }
    getRouter() {
        return this.router;
    }
}
exports.ProductSizePriceRoutes = ProductSizePriceRoutes;
//# sourceMappingURL=product-size-price.routes.js.map