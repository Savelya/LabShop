import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    manufacturer: string;

    @Column()
    price: number;

    @Column()
    number_sales: number;
}