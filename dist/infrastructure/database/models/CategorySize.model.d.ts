import { Category } from "./Category.model";
import { ProductSizePrice } from "./ProductSizePrice.model";
export declare class CategorySize {
    size_id: string;
    size_name: string;
    category: Category;
    sizePrices: ProductSizePrice[];
}
