import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";
import { Message } from "./message.entity";

@Entity()
export class User {

    @ObjectIdColumn()
    id?: ObjectID;

    @Column()
    email?: string;

    @Column()
    password?: string;

    @Column(type => Message)
    messages?: Message[];
}