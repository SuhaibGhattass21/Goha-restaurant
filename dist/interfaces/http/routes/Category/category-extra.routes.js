"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryExtraRoutes = void 0;
const express_1 = require("express");
const category_extra_validator_1 = require("../../validators/Category/category-extra.validator");
class CategoryExtraRoutes {
    constructor(categoryExtraController) {
        this.router = (0, express_1.Router)();
        this.categoryExtraController = categoryExtraController;
        this.initializeRoutes();
    }
    initializeRoutes() {
        // POST /category-extras - Create a new category extra
        this.router.post("/", category_extra_validator_1.CategoryExtraValidator.createCategoryExtra(), this.categoryExtraController.createCategoryExtra.bind(this.categoryExtraController));
        // GET /category-extras - Get all category extras with pagination
        this.router.get("/", category_extra_validator_1.CategoryExtraValidator.getCategoryExtras(), this.categoryExtraController.getAllCategoryExtras.bind(this.categoryExtraController));
        // 🔥 PUT THIS ROUTE BEFORE THE /:id ROUTE
        // GET /category-extras/category/:categoryId - Get extras by category ID
        this.router.get("/category/:categoryId", category_extra_validator_1.CategoryExtraValidator.getCategoryExtrasByCategoryId(), this.categoryExtraController.getCategoryExtrasByCategoryId.bind(this.categoryExtraController));
        // GET /category-extras/:id - Get category extra by ID
        this.router.get("/:id", category_extra_validator_1.CategoryExtraValidator.getCategoryExtraById(), this.categoryExtraController.getCategoryExtraById.bind(this.categoryExtraController));
        // PUT /category-extras/:id - Update category extra
        this.router.put("/:id", category_extra_validator_1.CategoryExtraValidator.updateCategoryExtra(), this.categoryExtraController.updateCategoryExtra.bind(this.categoryExtraController));
        // DELETE /category-extras/:id - Delete category extra
        this.router.delete("/:id", category_extra_validator_1.CategoryExtraValidator.deleteCategoryExtra(), this.categoryExtraController.deleteCategoryExtra.bind(this.categoryExtraController));
    }
    getRouter() {
        return this.router;
    }
}
exports.CategoryExtraRoutes = CategoryExtraRoutes;
//# sourceMappingURL=category-extra.routes.js.map