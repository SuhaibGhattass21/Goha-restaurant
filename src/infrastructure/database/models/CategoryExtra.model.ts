import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Category } from "./Category.model";

@Entity("category_extras")
export class CategoryExtra {
    @PrimaryGeneratedColumn("uuid")
    extra_id: string = uuidv4().toString();

    @Column({ type: "text" })
    name!: string;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    price!: number;

    @ManyToOne(() => Category, (category) => category.extras, { onDelete: "CASCADE" })
    @JoinColumn({ name: "category_id" })
    category!: Category;
}
