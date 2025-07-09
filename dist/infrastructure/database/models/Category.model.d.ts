import { Product } from "./Product.model";
import { CategorySize } from "./CategorySize.model";
import { CategoryExtra } from "./CategoryExtra.model";
export declare class Category {
    category_id: string;
    name: string;
    description?: string;
    products: Product[];
    sizes: CategorySize[];
    extras: CategoryExtra[];
}
