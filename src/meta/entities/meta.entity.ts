
import { Cuenta } from "src/cuenta/entities/cuenta.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToOne, JoinColumn, BeforeInsert, BeforeUpdate, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";

@Entity('meta')
export class Meta {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 200, nullable: false })
    nombre: string;

    @ManyToMany(() => Cuenta, cuenta => cuenta.metas)
    cuentas: Cuenta[];
}
