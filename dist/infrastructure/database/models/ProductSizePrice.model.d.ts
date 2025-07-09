import { Product } from "./Product.model";
import { CategorySize } from "./CategorySize.model";
export declare class ProductSizePrice {
    product_size_id: string;
    price: number;
    product: Product;
    size: CategorySize;
}
