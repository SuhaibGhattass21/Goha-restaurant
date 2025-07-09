"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepositoryImpl = void 0;
class ProductRepositoryImpl {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async create(productData) {
        const product = this.productRepository.create({
            ...productData,
            category: { category_id: productData.category_id },
        });
        return await this.productRepository.save(product);
    }
    async findById(id) {
        return await this.productRepository.findOne({
            where: { product_id: id },
            relations: ["category", "sizePrices", "sizePrices.size"],
        });
    }
    async findByNameAndCategory(name, categoryId) {
        return await this.productRepository.findOne({
            where: {
                name,
                category: { category_id: categoryId },
            },
        });
    }
    async findAll(page = 1, limit = 10) {
        const [products, total] = await this.productRepository.findAndCount({
            relations: ["category", "sizePrices", "sizePrices.size"],
            skip: (page - 1) * limit,
            take: limit,
            order: { name: "ASC" },
        });
        return { products, total };
    }
    async findByCategory(categoryId, page = 1, limit = 10) {
        const [products, total] = await this.productRepository.findAndCount({
            where: { category: { category_id: categoryId } },
            relations: ["category", "sizePrices", "sizePrices.size"],
            skip: (page - 1) * limit,
            take: limit,
            order: { name: "ASC" },
        });
        return { products, total };
    }
    async update(id, productData) {
        const updateData = { ...productData };
        if (productData.category_id) {
            updateData.category = { category_id: productData.category_id };
            delete updateData.category_id;
        }
        await this.productRepository.update(id, updateData);
        return await this.findById(id);
    }
    async delete(id) {
        const result = await this.productRepository.delete(id);
        return (result.affected ?? 0) > 0;
    }
}
exports.ProductRepositoryImpl = ProductRepositoryImpl;
//# sourceMappingURL=product.repository.impl.js.map