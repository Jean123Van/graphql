import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    first_name: string;

    @Column()
    last_name: string

    @Column()
    email: string;

    @Column()
    username: string;

    @Column()
    password: string;
}