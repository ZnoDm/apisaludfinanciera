
import { CuentaGasto } from "src/cuenta/entities/cuenta-gasto.entity";
import { Person } from "src/person/entities/person.entity";
import { TipoGasto } from "src/tipo-gasto/entities/tipo-gasto.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToOne, JoinColumn, BeforeInsert, BeforeUpdate, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
@Entity('categoria_gasto')
export class CategoriaGasto {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 200, nullable: false })
    nombre: string;

    @ManyToOne(() => TipoGasto, (tipoGasto) => tipoGasto.categoriaGastos)
    @JoinColumn({ name: 'tipoGasto_id' })
    tipoGasto: TipoGasto;

    @OneToMany(() => CuentaGasto, (cuentaGasto) => cuentaGasto.categoriaGasto)
    cuentaGastos: CuentaGasto[];

    @ManyToOne(() => Person, (person) => person.categoriaGastos)
    @JoinColumn({ name: 'person_id' })
    person: Person;
}
