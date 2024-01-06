import { Length } from 'class-validator';
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinTable, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'
import { User } from '../../users/entities/user.entity';
import { Permiso } from 'src/permiso/entities/permiso.entity';


@Entity('roles') // Nombre de la tabla de roles
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 200 })
  nombre: string;

  @Column('varchar', { length: 200 , nullable: true })
  descripcion: string;

  @ManyToMany(() => User, user => user.roles)
  users: User[];

  @ManyToMany(() => Permiso, (permiso) => permiso.roles)
  @JoinTable({
      name: 'role_permisos',
      synchronize: false,
      joinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
      },
      inverseJoinColumn: {
      name: 'permiso_id',
      referencedColumnName: 'id',
      },
  })
  permisos: Permiso[];
  
}