import { Banco } from "src/banco/entities/banco.entity";
import { CronogramaTarjeta } from "src/cronograma-tarjeta/entities/cronograma-tarjeta.entity";
import { ProveedorTarjeta } from "src/proveedor-tarjeta/entities/proveedor-tarjeta.entity";
import { Tarjeta } from "src/tarjeta/entities/tarjeta.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToOne, JoinColumn, BeforeInsert, BeforeUpdate, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";

@Entity('tipo_cierre')
export class TipoCierre {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 200, nullable: false })
    nombre: string;

    
    @ManyToOne(() => Banco, (banco) => banco.tipoCierres)
    @JoinColumn({ name: 'banco_id' })
    banco: Banco;

    @OneToMany(() => CronogramaTarjeta, (cronogramaTarjeta) => cronogramaTarjeta.tipoCierre)
    cronogramaTarjetas: CronogramaTarjeta[];

    
    @OneToMany(() => Tarjeta, (tarjeta) => tarjeta.tipoCierre)
    tarjetas: Tarjeta[];

    // @BeforeInsert()
    // checkFieldsBeforeInsert() {
    //     this.nombre = this.nombre.toLowerCase().trim();
    // }

    // @BeforeUpdate()
    // checkFieldsBeforeUpdate() {
    //     this.checkFieldsBeforeInsert();   
    // }
}
