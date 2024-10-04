import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    userId: string;
    userName: string;
    password: string;
    salt: string;
}