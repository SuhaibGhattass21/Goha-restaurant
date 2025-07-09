import { Category } from "./Category.model";
import { ProductSizePrice } from "./ProductSizePrice.model";
export declare class Product {
    product_id: string;
    name: string;
    description?: string;
    image_url?: string;
    is_active: boolean;
    category: Category;
    sizePrices: ProductSizePrice[];
}
