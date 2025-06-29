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

@Entity("category_sizes")
export class CategorySize {
    @PrimaryGeneratedColumn("uuid")
    size_id: string = uuidv4().toString();

    @Column({ type: "text" })
    size_name!: string;

    @ManyToOne(() => Category, (category) => category.sizes, { onDelete: "CASCADE" })
    @JoinColumn({ name: "category_id" })
    category!: Category;

    @OneToMany(() => ProductSizePrice, (psp) => psp.size)
    sizePrices!: ProductSizePrice[];
}
