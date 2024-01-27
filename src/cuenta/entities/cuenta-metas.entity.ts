import { Length } from 'class-validator';
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'
import { Role } from '../../rol/entities/rol.entity';
import { Meta } from 'src/meta/entities/meta.entity';
import { Cuenta } from './cuenta.entity';


@Entity('cuenta_metas')
export class CuentaMetas {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Meta)
    @JoinColumn({ name: 'meta_id' })
    meta: Meta;

    @ManyToOne(() => Cuenta)
    @JoinColumn({ name: 'cuenta_id' }) 
    cuenta: Cuenta;


}