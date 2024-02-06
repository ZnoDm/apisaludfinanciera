import { Banco } from "src/banco/entities/banco.entity";
import { ProveedorTarjeta } from "src/proveedor-tarjeta/entities/proveedor-tarjeta.entity";
import { TipoCierre } from "src/tipo-cierre/entities/tipo-cierre.entity";
import { TipoTarjeta } from "src/tipo-tarjeta/entities/tipo-tarjeta.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToOne, JoinColumn, BeforeInsert, BeforeUpdate, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Tarjeta } from "./tarjeta.entity";

@Entity('tarjeta_pago')
export class TarjetaPago {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Tarjeta, (tarjeta) => tarjeta.tarjetaPagos)
    @JoinColumn({ name: 'tarjeta_id' })
    tarjeta: Tarjeta;


    @Column()
    anio: number;

    @Column()
    mes: number;

    
    @Column('date')
    fechaPago: Date;


    // @BeforeInsert()
    // checkFieldsBeforeInsert() {
    //     this.nombre = this.nombre.toLowerCase().trim();
    // }

    // @BeforeUpdate()
    // checkFieldsBeforeUpdate() {
    //     this.checkFieldsBeforeInsert();   
    // }
}
