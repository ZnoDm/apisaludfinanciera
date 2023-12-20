import { Length } from 'class-validator';
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './user.entity';
import { Role } from '../../rol/entities/rol.entity';


@Entity('user_roles')
export class UserRole {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' }) // Nombre de la columna en la tabla user_roles que almacena la clave externa de User
    user: User;

    @ManyToOne(() => Role)
    @JoinColumn({ name: 'role_id' }) // Nombre de la columna en la tabla user_roles que almacena la clave externa de Role
    role: Role;

}