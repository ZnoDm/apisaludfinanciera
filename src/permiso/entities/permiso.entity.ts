import { Length } from 'class-validator';
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinTable, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from 'src/rol/entities/rol.entity';


@Entity('permiso') // Nombre de la tabla de permiso
export class Permiso {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  url: string;

  @ManyToMany(() => Role, role => role.permisos)
  roles: Role[];

}