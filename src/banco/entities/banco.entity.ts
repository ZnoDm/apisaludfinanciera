
import { CronogramaTarjeta } from "src/cronograma-tarjeta/entities/cronograma-tarjeta.entity";
import { TipoCierre } from "src/tipo-cierre/entities/tipo-cierre.entity";
import { TipoTarjeta } from "src/tipo-tarjeta/entities/tipo-tarjeta.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToOne, JoinColumn, BeforeInsert, BeforeUpdate, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";

@Entity('banco')
export class Banco {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 200, nullable: false })
    nombre: string;

    @Column('varchar', { length: 50, nullable: true })
    codigo: string;

    @OneToMany(() => TipoTarjeta, (tipoTarejeta) => tipoTarejeta.banco)
    tipoTarjetas: TipoTarjeta[];

    @OneToMany(() => TipoCierre, (tipoCierre) => tipoCierre.banco)
    tipoCierres: TipoCierre[];


    @OneToMany(() => CronogramaTarjeta, (cronogramaTarjeta) => cronogramaTarjeta.banco)
    cronogramaTarjetas: CronogramaTarjeta[];


    // @BeforeInsert()
    // checkFieldsBeforeInsert() {
    //     this.nombre = this.nombre.toLowerCase().trim();
    // }

    // @BeforeUpdate()
    // checkFieldsBeforeUpdate() {
    //     this.checkFieldsBeforeInsert();   
    // }

}
