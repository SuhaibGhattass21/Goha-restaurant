"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategorySizeUseCases = void 0;
class CategorySizeUseCases {
    constructor(categorySizeRepository, categoryRepository) {
        this.categorySizeRepository = categorySizeRepository;
        this.categoryRepository = categoryRepository;
    }
    async createCategorySize(sizeData) {
        // Check if category exists
        const category = await this.categoryRepository.findById(sizeData.category_id);
        if (!category) {
            throw new Error("Category not found");
        }
        // Check if size with same name already exists for this category
        const existingSize = await this.categorySizeRepository.findBySizeName(sizeData.size_name);
        if (existingSize && existingSize.category.category_id === sizeData.category_id) {
            throw new Error("Size with this name already exists for this category");
        }
        const size = await this.categorySizeRepository.create(sizeData);
        return this.mapToResponseDto(size);
    }
    async getCategorySizeById(id) {
        const size = await this.categorySizeRepository.findById(id);
        return size ? this.mapToResponseDto(size) : null;
    }
    async getCategorySizesByCategoryId(categoryId) {
        const sizes = await this.categorySizeRepository.findByCategoryId(categoryId);
        return sizes.map(size => this.mapToResponseDto(size));
    }
    async getAllCategorySizes(page, limit) {
        const { sizes, total } = await this.categorySizeRepository.findAll(page, limit);
        return {
            sizes: sizes.map(size => this.mapToResponseDto(size)),
            total,
            page,
            limit
        };
    }
    async updateCategorySize(id, sizeData) {
        // Check if size exists
        const existingSize = await this.categorySizeRepository.findById(id);
        if (!existingSize) {
            return null;
        }
        // If category_id is being updated, check if new category exists
        if (sizeData.category_id) {
            const category = await this.categoryRepository.findById(sizeData.category_id);
            if (!category) {
                throw new Error("Category not found");
            }
        }
        // Check for name conflicts if size_name is being updated
        if (sizeData.size_name) {
            const nameConflict = await this.categorySizeRepository.findBySizeName(sizeData.size_name);
            if (nameConflict && nameConflict.size_id !== id) {
                const categoryId = sizeData.category_id || existingSize.category.category_id;
                if (nameConflict.category.category_id === categoryId) {
                    throw new Error("Size with this name already exists for this category");
                }
            }
        }
        const updatedSize = await this.categorySizeRepository.update(id, sizeData);
        return updatedSize ? this.mapToResponseDto(updatedSize) : null;
    }
    async deleteCategorySize(id) {
        return await this.categorySizeRepository.delete(id);
    }
    mapToResponseDto(size) {
        return {
            size_id: size.size_id,
            size_name: size.size_name,
            category: size.category ? {
                category_id: size.category.category_id,
                name: size.category.name
            } : undefined
        };
    }
}
exports.CategorySizeUseCases = CategorySizeUseCases;
//# sourceMappingURL=category-size.use-cases.js.map