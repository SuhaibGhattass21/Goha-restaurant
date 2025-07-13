import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Product } from "./Product.model";
import { CategorySize } from "./CategorySize.model";
import { CategoryExtra } from "./CategoryExtra.model";

@Entity("categories")
export class Category {
    @PrimaryGeneratedColumn("uuid")
    category_id: string = uuidv4().toString();

    @Column({ type: "text", unique: true })
    name!: string;

    @Column({ type: "text", nullable: true })
    description?: string;

    @OneToMany(() => Product, (product: Product) => product.category)
    products!: Product[];

    @OneToMany(() => CategorySize, (size: CategorySize) => size.category)

    sizes!: CategorySize[];

    @OneToMany(() => CategoryExtra, (extra: CategoryExtra) => extra.category)

    extras!: CategoryExtra[];
}
