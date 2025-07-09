"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategorySizeRepositoryImpl = void 0;
class CategorySizeRepositoryImpl {
    constructor(categorySizeRepository, categoryRepository) {
        this.categorySizeRepository = categorySizeRepository;
        this.categoryRepository = categoryRepository;
    }
    async create(sizeData) {
        console.log("🔍 Creating size with data:", sizeData);
        // First, fetch the full Category object
        const category = await this.categoryRepository.findOne({
            where: { category_id: sizeData.category_id }
        });
        if (!category) {
            throw new Error("Category not found");
        }
        // Create the CategorySize with the full Category object
        const size = this.categorySizeRepository.create({
            size_name: sizeData.size_name,
            category: category // Pass the full Category object, not just the ID
        });
        const savedSize = await this.categorySizeRepository.save(size);
        console.log("✅ Created size:", savedSize);
        return savedSize;
    }
    async findById(id) {
        return await this.categorySizeRepository.findOne({
            where: { size_id: id },
            relations: ["category"],
        });
    }
    async findBySizeName(sizeName) {
        return await this.categorySizeRepository.findOne({
            where: { size_name: sizeName },
            relations: ["category"],
        });
    }
    async findByCategoryId(categoryId) {
        console.log("🔍 Searching for sizes with category_id:", categoryId);
        const sizes = await this.categorySizeRepository
            .createQueryBuilder("size")
            .leftJoinAndSelect("size.category", "category")
            .where("category.category_id = :categoryId", { categoryId })
            .getMany();
        console.log("🔍 Found sizes:", sizes.length);
        if (sizes.length > 0) {
            console.log("🔍 First size:", {
                size_id: sizes[0].size_id,
                size_name: sizes[0].size_name,
                category: sizes[0].category ? {
                    category_id: sizes[0].category.category_id,
                    name: sizes[0].category.name
                } : 'NO CATEGORY'
            });
        }
        return sizes;
    }
    async findAll(page = 1, limit = 10) {
        const [sizes, total] = await this.categorySizeRepository.findAndCount({
            relations: ["category"],
            skip: (page - 1) * limit,
            take: limit,
            order: { size_name: "ASC" },
        });
        console.log("🔍 FindAll - Found sizes:", sizes.length);
        return { sizes, total };
    }
    async update(id, sizeData) {
        const updateData = {};
        if (sizeData.size_name) {
            updateData.size_name = sizeData.size_name;
        }
        if (sizeData.category_id) {
            // Fetch the full Category object for update too
            const category = await this.categoryRepository.findOne({
                where: { category_id: sizeData.category_id }
            });
            if (!category) {
                throw new Error("Category not found");
            }
            updateData.category = category;
        }
        await this.categorySizeRepository.update(id, updateData);
        return await this.findById(id);
    }
    async delete(id) {
        const result = await this.categorySizeRepository.delete(id);
        return (result.affected ?? 0) > 0;
    }
}
exports.CategorySizeRepositoryImpl = CategorySizeRepositoryImpl;
//# sourceMappingURL=category-size.repository.js.map