import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('comments')
export class CommentsEntity {
    @PrimaryGeneratedColumn('uuid')
    id:string
    @Column()
    comment:string;
    @Column()
    user:string;
    @Column()
    postId: string;
    @CreateDateColumn()
    created_at: Date;
}