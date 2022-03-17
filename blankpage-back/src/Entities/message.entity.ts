import { Column, Entity } from "typeorm";

@Entity()
export class Message {
    @Column()
    date: number;

    @Column()
    time: number;

    @Column()
    messageBody: string;
}