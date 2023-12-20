
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToOne, JoinColumn, BeforeInsert, BeforeUpdate, ManyToOne, UpdateDateColumn, CreateDateColumn } from "typeorm";
import { TipoGasto } from "./tipo-gasto.entity";
import { CategoriaGasto } from "./categoria-gasto.entity";


@Entity('gasto')
export class Gasto {
    
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => TipoGasto, (tipoGasto) => tipoGasto.gastos)
    @JoinColumn({ name: 'tipoGasto_id' })
    tipoGasto: TipoGasto;

    @ManyToOne(() => CategoriaGasto, (categoriaGasto) => categoriaGasto.gastos)
    @JoinColumn({ name: 'categoriaGasto_id' })
    categoriaGasto: CategoriaGasto;

    @Column('decimal')
    monto: number;

    @CreateDateColumn()
    fechaCreacion: Date;

    @UpdateDateColumn()
    fechaModificacion: Date;
}
