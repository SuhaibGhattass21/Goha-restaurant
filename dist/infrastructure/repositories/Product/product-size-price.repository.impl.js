"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSizePriceRepositoryImpl = void 0;
class ProductSizePriceRepositoryImpl {
    constructor(productSizePriceRepository) {
        this.productSizePriceRepository = productSizePriceRepository;
    }
    async create(productSizePriceData) {
        const productSizePrice = this.productSizePriceRepository.create({
            ...productSizePriceData,
            product: { product_id: productSizePriceData.product_id },
            size: { size_id: productSizePriceData.size_id },
        });
        return await this.productSizePriceRepository.save(productSizePrice);
    }
    async findById(id) {
        return await this.productSizePriceRepository.findOne({
            where: { product_size_id: id },
            relations: ["product", "size"],
        });
    }
    async findByProductAndSize(productId, sizeId) {
        return await this.productSizePriceRepository.findOne({
            where: {
                product: { product_id: productId },
                size: { size_id: sizeId },
            },
        });
    }
    async findAll(page = 1, limit = 10) {
        const [productSizePrices, total] = await this.productSizePriceRepository.findAndCount({
            relations: ["product", "size"],
            skip: (page - 1) * limit,
            take: limit,
            order: { price: "ASC" },
        });
        return { productSizePrices, total };
    }
    async findByProduct(productId, page = 1, limit = 10) {
        const [productSizePrices, total] = await this.productSizePriceRepository.findAndCount({
            where: { product: { product_id: productId } },
            relations: ["product", "size"],
            skip: (page - 1) * limit,
            take: limit,
            order: { price: "ASC" },
        });
        return { productSizePrices, total };
    }
    async update(id, productSizePriceData) {
        const updateData = { ...productSizePriceData };
        if (productSizePriceData.product_id) {
            updateData.product = { product_id: productSizePriceData.product_id };
            delete updateData.product_id;
        }
        if (productSizePriceData.size_id) {
            updateData.size = { size_id: productSizePriceData.size_id };
            delete updateData.size_id;
        }
        await this.productSizePriceRepository.update(id, updateData);
        return await this.findById(id);
    }
    async delete(id) {
        const result = await this.productSizePriceRepository.delete(id);
        return (result.affected ?? 0) > 0;
    }
}
exports.ProductSizePriceRepositoryImpl = ProductSizePriceRepositoryImpl;
//# sourceMappingURL=product-size-price.repository.impl.js.map