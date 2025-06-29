import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Category } from "./Category.model";
import { ProductSizePrice } from "./ProductSizePrice.model";

@Entity("products")
export class Product {
    @PrimaryGeneratedColumn("uuid")
    product_id: string = uuidv4().toString();

    @Column({ type: "text" })
    name!: string;

    @Column({ type: "text", nullable: true })
    description?: string;

    @Column({ type: "text" })
    image_url?: string;

    @Column({ type: "boolean", default: true })
    is_active: boolean = true;

    @ManyToOne(() => Category, (category) => category.products, { onDelete: "CASCADE" })
    @JoinColumn({ name: "category_id" })
    category!: Category;

    @OneToMany(() => ProductSizePrice, (psp) => psp.product, { cascade: true, orphanedRowAction: 'delete' })
    sizePrices!: ProductSizePrice[];
}
