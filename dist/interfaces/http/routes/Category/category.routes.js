"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoutes = void 0;
const express_1 = require("express");
const category_validator_1 = require("../../validators/Category/category.validator");
class CategoryRoutes {
    constructor(categoryController) {
        this.router = (0, express_1.Router)();
        this.categoryController = categoryController;
        this.initializeRoutes();
    }
    initializeRoutes() {
        // POST /categories - Create a new category
        this.router.post("/", category_validator_1.CategoryValidator.createCategory(), this.categoryController.createCategory.bind(this.categoryController));
        // GET /categories - Get all categories with pagination
        this.router.get("/", category_validator_1.CategoryValidator.getCategories(), this.categoryController.getAllCategories.bind(this.categoryController));
        // GET /categories/:id - Get category by ID
        this.router.get("/:id", category_validator_1.CategoryValidator.getCategoryById(), this.categoryController.getCategoryById.bind(this.categoryController));
        // PUT /categories/:id - Update category
        this.router.put("/:id", category_validator_1.CategoryValidator.updateCategory(), this.categoryController.updateCategory.bind(this.categoryController));
        // DELETE /categories/:id - Delete category
        this.router.delete("/:id", category_validator_1.CategoryValidator.deleteCategory(), this.categoryController.deleteCategory.bind(this.categoryController));
    }
    getRouter() {
        return this.router;
    }
}
exports.CategoryRoutes = CategoryRoutes;
//# sourceMappingURL=category.routes.js.map