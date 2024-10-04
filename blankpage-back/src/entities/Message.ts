import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Message{
    @PrimaryGeneratedColumn()
    messageId: string;
    userId: string;
    timestamp: Date;
    messageBody: string;
}