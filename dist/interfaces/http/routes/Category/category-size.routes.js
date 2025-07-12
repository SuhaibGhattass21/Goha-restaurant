"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategorySizeRoutes = void 0;
const express_1 = require("express");
const category_size_validator_1 = require("../../validators/Category/category-size.validator");
class CategorySizeRoutes {
    constructor(categorySizeController) {
        this.router = (0, express_1.Router)();
        this.categorySizeController = categorySizeController;
        this.initializeRoutes();
    }
    initializeRoutes() {
        // POST /category-sizes - Create a new category size
        this.router.post("/", category_size_validator_1.CategorySizeValidator.createCategorySize(), this.categorySizeController.createCategorySize.bind(this.categorySizeController));
        // GET /category-sizes - Get all category sizes with pagination
        this.router.get("/", category_size_validator_1.CategorySizeValidator.getCategorySizes(), this.categorySizeController.getAllCategorySizes.bind(this.categorySizeController));
        // GET /category-sizes/:id - Get category size by ID
        this.router.get("/:id", category_size_validator_1.CategorySizeValidator.getCategorySizeById(), this.categorySizeController.getCategorySizeById.bind(this.categorySizeController));
        // GET /category-sizes/category/:categoryId - Get sizes by category ID
        this.router.get("/category/:categoryId", category_size_validator_1.CategorySizeValidator.getCategorySizesByCategoryId(), this.categorySizeController.getCategorySizesByCategoryId.bind(this.categorySizeController));
        // PUT /category-sizes/:id - Update category size
        this.router.put("/:id", category_size_validator_1.CategorySizeValidator.updateCategorySize(), this.categorySizeController.updateCategorySize.bind(this.categorySizeController));
        // DELETE /category-sizes/:id - Delete category size
        this.router.delete("/:id", category_size_validator_1.CategorySizeValidator.deleteCategorySize(), this.categorySizeController.deleteCategorySize.bind(this.categorySizeController));
    }
    getRouter() {
        return this.router;
    }
}
exports.CategorySizeRoutes = CategorySizeRoutes;
//# sourceMappingURL=category-size.routes.js.map