import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('friends')
export class FriendEntity{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    userId: string;

    @Column()
    friendId:string;
}