

import { Meta } from "src/meta/entities/meta.entity";
import { Person } from "src/person/entities/person.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToOne, JoinColumn, BeforeInsert, BeforeUpdate, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { CuentaGasto } from "./cuenta-gasto.entity";

@Entity('cuenta')
export class Cuenta {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 200, nullable: false })
    nombre: string;

    // @Column('decimal',{ default: 0.00 })
    // saldo: number;

    @Column('decimal',{ default: 0.00, precision: 10, scale: 2  })
    saldoMensualPromedio: number;

    @Column('datetime' ,{ nullable: true })
    fechaModificacion: Date;

    @ManyToMany(() => Meta, (meta) => meta.cuentas)
    @JoinTable({
        name: 'cuenta_metas',
        synchronize: false,
        joinColumn: {
        name: 'cuenta_id',
        referencedColumnName: 'id',
        },
        inverseJoinColumn: {
        name: 'meta_id',
        referencedColumnName: 'id',
        },
    })
    metas: Meta[];


    @ManyToOne(() => Person, (person) => person.cuentas)
    @JoinColumn({ name: 'person_id' })
    person: Person;

    @OneToMany(() => CuentaGasto, (cuentaGasto) => cuentaGasto.cuenta)
    cuentaGastos: CuentaGasto[];

}
