import { ObjectID } from "typeorm";
import { Message } from "./message.entity";
export declare class User {
    id?: ObjectID;
    email?: string;
    password?: string;
    messages?: Message[];
}
