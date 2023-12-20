import { Length } from 'class-validator';
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../../rol/entities/rol.entity';
import { Permiso } from 'src/permiso/entities/permiso.entity';


@Entity('role_permisos')
export class RolePermiso {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Permiso)
    @JoinColumn({ name: 'permiso_id' }) // Nombre de la columna en la tabla user_roles que almacena la clave externa de User
    permiso: Permiso;

    @ManyToOne(() => Role)
    @JoinColumn({ name: 'role_id' }) // Nombre de la columna en la tabla user_roles que almacena la clave externa de Role
    role: Role;

}