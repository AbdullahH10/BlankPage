import { ObjectID } from "typeorm";
import { Message } from "../Model/message.model";
export declare class User {
    _id: ObjectID;
    userId: string;
    userName: string;
    password: string;
    token: string;
    messages?: Message[];
}
