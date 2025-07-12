"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryUseCases = void 0;
class CategoryUseCases {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    async createCategory(categoryData) {
        // Check if category with same name already exists
        const existingCategory = await this.categoryRepository.findByName(categoryData.name);
        if (existingCategory) {
            throw new Error("Category with this name already exists");
        }
        const category = await this.categoryRepository.create(categoryData);
        return this.mapToResponseDto(category);
    }
    async getCategoryById(id) {
        const category = await this.categoryRepository.findById(id);
        return category ? this.mapToResponseDto(category) : null;
    }
    async getAllCategories(page = 1, limit = 10) {
        const { categories, total } = await this.categoryRepository.findAll(page, limit);
        return {
            categories: categories.map((category) => this.mapToResponseDto(category)),
            total,
            page,
            limit,
        };
    }
    async updateCategory(id, categoryData) {
        // If name is being updated, check for duplicates
        if (categoryData.name) {
            const existingCategory = await this.categoryRepository.findByName(categoryData.name);
            if (existingCategory && existingCategory.category_id !== id) {
                throw new Error("Category with this name already exists");
            }
        }
        const category = await this.categoryRepository.update(id, categoryData);
        return category ? this.mapToResponseDto(category) : null;
    }
    async deleteCategory(id) {
        const category = await this.categoryRepository.findById(id);
        if (!category) {
            return false;
        }
        return await this.categoryRepository.delete(id);
    }
    mapToResponseDto(category) {
        return {
            category_id: category.category_id,
            name: category.name,
            description: category.description,
            products: category.products || [],
            sizes: category.sizes || [],
            extras: category.extras || [],
        };
    }
}
exports.CategoryUseCases = CategoryUseCases;
//# sourceMappingURL=category.use-cases.js.map