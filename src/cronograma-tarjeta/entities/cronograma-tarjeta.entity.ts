import { Banco } from "src/banco/entities/banco.entity";
import { ProveedorTarjeta } from "src/proveedor-tarjeta/entities/proveedor-tarjeta.entity";
import { TipoCierre } from "src/tipo-cierre/entities/tipo-cierre.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToOne, JoinColumn, BeforeInsert, BeforeUpdate, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('cronograma_tarjeta')
export class CronogramaTarjeta {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 200, nullable: false })
    periodo: string;

    @ManyToOne(() => TipoCierre, (tipoCierre) => tipoCierre.cronogramaTarjetas)
    @JoinColumn({ name: 'tipoCierre_id' })
    tipoCierre: TipoCierre;

    @Column()
    anio: number;

    @Column()
    mes: number;

    @Column('date')
    fechaFacturacion: Date;

    @Column('date')
    fechaPago: Date;

}
