"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRepositoryImpl = void 0;
class CategoryRepositoryImpl {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    async create(categoryData) {
        const category = this.categoryRepository.create(categoryData);
        return await this.categoryRepository.save(category);
    }
    async findById(id) {
        return await this.categoryRepository.findOne({
            where: { category_id: id },
            relations: ["products", "sizes", "extras"],
        });
    }
    async findByName(name) {
        return await this.categoryRepository.findOne({
            where: { name },
        });
    }
    async findAll(page = 1, limit = 10) {
        const [categories, total] = await this.categoryRepository.findAndCount({
            relations: ["products", "sizes", "extras"],
            skip: (page - 1) * limit,
            take: limit,
            order: { name: "ASC" },
        });
        return { categories, total };
    }
    async update(id, categoryData) {
        await this.categoryRepository.update(id, categoryData);
        return await this.findById(id);
    }
    async delete(id) {
        const result = await this.categoryRepository.delete(id);
        return (result.affected ?? 0) > 0;
    }
}
exports.CategoryRepositoryImpl = CategoryRepositoryImpl;
//# sourceMappingURL=category.repository.impl.js.map