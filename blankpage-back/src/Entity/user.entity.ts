import { Column, Entity, Index, ObjectID, ObjectIdColumn, Unique} from "typeorm";
import { Message } from "../Model/message.model";
import { v4 } from "uuid";

@Entity('User')
@Unique(['userName'])
@Index(
    ['userName'],
    {
        unique: true
    }
)
export class User{
    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    userId: string = v4();

    @Column()
    userName: string;

    @Column()
    token: string;

    @Column()
    password: string;

    @Column({
        type: 'jsonb',
        nullable: true
    })
    messages?: Message[];
}