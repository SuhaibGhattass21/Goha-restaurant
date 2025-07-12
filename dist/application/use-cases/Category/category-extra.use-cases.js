"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryExtraUseCases = void 0;
class CategoryExtraUseCases {
    constructor(categoryExtraRepository, categoryRepository) {
        this.categoryExtraRepository = categoryExtraRepository;
        this.categoryRepository = categoryRepository;
    }
    async createCategoryExtra(extraData) {
        // Check if category exists
        const category = await this.categoryRepository.findById(extraData.category_id);
        if (!category) {
            throw new Error("Category not found");
        }
        // Check if extra with same name already exists for this category
        const existingExtra = await this.categoryExtraRepository.findByName(extraData.name);
        if (existingExtra && existingExtra.category.category_id === extraData.category_id) {
            throw new Error("Extra with this name already exists for this category");
        }
        const extra = await this.categoryExtraRepository.create(extraData);
        return this.mapToResponseDto(extra);
    }
    async getCategoryExtraById(id) {
        const extra = await this.categoryExtraRepository.findById(id);
        return extra ? this.mapToResponseDto(extra) : null;
    }
    async getCategoryExtrasByCategoryId(categoryId) {
        const extras = await this.categoryExtraRepository.findByCategoryId(categoryId);
        return extras.map(extra => this.mapToResponseDto(extra));
    }
    async getAllCategoryExtras(page, limit) {
        const { extras, total } = await this.categoryExtraRepository.findAll(page, limit);
        return {
            extras: extras.map(extra => this.mapToResponseDto(extra)),
            total,
            page,
            limit
        };
    }
    async updateCategoryExtra(id, extraData) {
        // Check if extra exists
        const existingExtra = await this.categoryExtraRepository.findById(id);
        if (!existingExtra) {
            return null;
        }
        // If category_id is being updated, check if new category exists
        if (extraData.category_id) {
            const category = await this.categoryRepository.findById(extraData.category_id);
            if (!category) {
                throw new Error("Category not found");
            }
        }
        // Check for name conflicts if name is being updated
        if (extraData.name) {
            const nameConflict = await this.categoryExtraRepository.findByName(extraData.name);
            if (nameConflict && nameConflict.extra_id !== id) {
                const categoryId = extraData.category_id || existingExtra.category.category_id;
                if (nameConflict.category.category_id === categoryId) {
                    throw new Error("Extra with this name already exists for this category");
                }
            }
        }
        const updatedExtra = await this.categoryExtraRepository.update(id, extraData);
        return updatedExtra ? this.mapToResponseDto(updatedExtra) : null;
    }
    async deleteCategoryExtra(id) {
        return await this.categoryExtraRepository.delete(id);
    }
    mapToResponseDto(extra) {
        return {
            extra_id: extra.extra_id,
            name: extra.name,
            price: extra.price,
            category: extra.category ? {
                category_id: extra.category.category_id,
                name: extra.category.name
            } : undefined
        };
    }
}
exports.CategoryExtraUseCases = CategoryExtraUseCases;
//# sourceMappingURL=category-extra.use-cases.js.map