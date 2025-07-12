"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryExtraRepositoryImpl = void 0;
class CategoryExtraRepositoryImpl {
    constructor(categoryExtraRepository, categoryRepository) {
        this.categoryExtraRepository = categoryExtraRepository;
        this.categoryRepository = categoryRepository;
    }
    async create(extraData) {
        console.log("🔍 Creating extra with data:", extraData);
        // First, fetch the full Category object
        const category = await this.categoryRepository.findOne({
            where: { category_id: extraData.category_id }
        });
        if (!category) {
            throw new Error("Category not found");
        }
        // Create the CategoryExtra with the full Category object
        const extra = this.categoryExtraRepository.create({
            name: extraData.name,
            price: extraData.price,
            category: category // Pass the full Category object, not just the ID
        });
        const savedExtra = await this.categoryExtraRepository.save(extra);
        console.log("✅ Created extra:", savedExtra);
        return savedExtra;
    }
    async findById(id) {
        return await this.categoryExtraRepository.findOne({
            where: { extra_id: id },
            relations: ["category"],
        });
    }
    async findByName(name) {
        return await this.categoryExtraRepository.findOne({
            where: { name },
            relations: ["category"],
        });
    }
    async findByCategoryId(categoryId) {
        console.log("🔍 Searching for extras with category_id:", categoryId);
        const extras = await this.categoryExtraRepository
            .createQueryBuilder("extra")
            .leftJoinAndSelect("extra.category", "category")
            .where("category.category_id = :categoryId", { categoryId })
            .getMany();
        console.log("🔍 Found extras:", extras.length);
        if (extras.length > 0) {
            console.log("🔍 First extra:", {
                extra_id: extras[0].extra_id,
                name: extras[0].name,
                price: extras[0].price,
                category: extras[0].category ? {
                    category_id: extras[0].category.category_id,
                    name: extras[0].category.name
                } : 'NO CATEGORY'
            });
        }
        return extras;
    }
    async findAll(page = 1, limit = 10) {
        const [extras, total] = await this.categoryExtraRepository.findAndCount({
            relations: ["category"],
            skip: (page - 1) * limit,
            take: limit,
            order: { name: "ASC" },
        });
        console.log("🔍 FindAll - Found extras:", extras.length);
        return { extras, total };
    }
    async update(id, extraData) {
        const updateData = {};
        if (extraData.name) {
            updateData.name = extraData.name;
        }
        if (extraData.price !== undefined) {
            updateData.price = extraData.price;
        }
        if (extraData.category_id) {
            // Fetch the full Category object for update too
            const category = await this.categoryRepository.findOne({
                where: { category_id: extraData.category_id }
            });
            if (!category) {
                throw new Error("Category not found");
            }
            updateData.category = category;
        }
        await this.categoryExtraRepository.update(id, updateData);
        return await this.findById(id);
    }
    async delete(id) {
        const result = await this.categoryExtraRepository.delete(id);
        return (result.affected ?? 0) > 0;
    }
}
exports.CategoryExtraRepositoryImpl = CategoryExtraRepositoryImpl;
//# sourceMappingURL=category-extra.repository.js.map