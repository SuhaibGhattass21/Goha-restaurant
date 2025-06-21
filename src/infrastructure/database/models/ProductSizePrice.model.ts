import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Product } from "./Product.model";
import { CategorySize } from "./CategorySize.model";

@Entity("product_size_prices")
export class ProductSizePrice {
    @PrimaryGeneratedColumn("uuid")
    product_size_id: string = uuidv4().toString();

    @Column({ type: "decimal", precision: 10, scale: 2 })
    price!: number;

    @ManyToOne(() => Product, (product) => product.sizePrices)
    @JoinColumn({ name: "product_id" })
    product!: Product;

    @ManyToOne(() => CategorySize, (size) => size.sizePrices)
    @JoinColumn({ name: "size_id" })
    size!: CategorySize;
}
