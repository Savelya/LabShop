import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Prodan {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    date: string;

    @Column()
    price: number;

}