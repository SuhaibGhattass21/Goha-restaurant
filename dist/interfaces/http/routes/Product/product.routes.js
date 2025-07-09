"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = require("express");
const product_validator_1 = require("../../validators/Product/product.validator");
class ProductRoutes {
    constructor(productController) {
        this.router = (0, express_1.Router)();
        this.productController = productController;
        this.initializeRoutes();
    }
    initializeRoutes() {
        // POST /products - Create a new product
        this.router.post("/", product_validator_1.ProductValidator.createProduct(), this.productController.createProduct.bind(this.productController));
        // GET /products - Get all products with pagination
        this.router.get("/", product_validator_1.ProductValidator.getProducts(), this.productController.getAllProducts.bind(this.productController));
        // GET /products/category/:categoryId - Get products by category
        this.router.get("/category/:categoryId", product_validator_1.ProductValidator.getProductsByCategory(), this.productController.getProductsByCategory.bind(this.productController));
        // GET /products/:id - Get product by ID
        this.router.get("/:id", product_validator_1.ProductValidator.getProductById(), this.productController.getProductById.bind(this.productController));
        // PUT /products/:id - Update product
        this.router.put("/:id", product_validator_1.ProductValidator.updateProduct(), this.productController.updateProduct.bind(this.productController));
        // DELETE /products/:id - Delete product
        this.router.delete("/:id", product_validator_1.ProductValidator.deleteProduct(), this.productController.deleteProduct.bind(this.productController));
    }
    getRouter() {
        return this.router;
    }
}
exports.ProductRoutes = ProductRoutes;
//# sourceMappingURL=product.routes.js.map