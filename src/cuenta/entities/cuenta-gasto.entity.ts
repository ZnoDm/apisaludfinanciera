

import { Meta } from "src/meta/entities/meta.entity";
import { Person } from "src/person/entities/person.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToOne, JoinColumn, BeforeInsert, BeforeUpdate, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Cuenta } from "./cuenta.entity";
import { TipoGasto } from "src/tipo-gasto/entities/tipo-gasto.entity";
import { CategoriaGasto } from "src/categoria-gasto/entities/categoria-gasto.entity";

@Entity('cuenta_gasto')
export class CuentaGasto {
    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToOne(() => Cuenta, cuenta => cuenta.cuentaGastos)
    @JoinColumn({ name: 'cuenta_id' })
    cuenta: Cuenta;
    
    @Column({ type: 'decimal', default: 0.00, precision: 10, scale: 2  })
    monto: number;

    @Column('datetime' ,{ nullable: true })
    fechaRegistro: Date;
  
    @ManyToOne(() => CategoriaGasto, categoriaGasto => categoriaGasto.cuentaGastos)
    @JoinColumn({ name: 'categoriaGasto_id' })
    categoriaGasto: CategoriaGasto;
    

    
    @ManyToOne(() => TipoGasto, tipoGasto => tipoGasto.cuentaGastos)
    @JoinColumn({ name: 'tipoGasto_id' })
    tipoGasto: TipoGasto;
}
