import { Banco } from "src/banco/entities/banco.entity";
import { ProveedorTarjeta } from "src/proveedor-tarjeta/entities/proveedor-tarjeta.entity";
import { TipoCierre } from "src/tipo-cierre/entities/tipo-cierre.entity";
import { TipoTarjeta } from "src/tipo-tarjeta/entities/tipo-tarjeta.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToOne, JoinColumn, BeforeInsert, BeforeUpdate, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { TarjetaPago } from "./tarjeta-pago.entity";
import { Person } from "src/person/entities/person.entity";

@Entity('tarjeta')
export class Tarjeta {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 200, nullable: false })
    nombre: string;

    @Column('bit', { default: true })
    isActive: boolean;

    @Column('bit', { default: false })
    hasNotifyCelular: boolean;

    @Column('bit', { default: false })
    hasNotifyEmail: boolean;

    @ManyToOne(() => Person, (person) => person.tarjetas)
    @JoinColumn({ name: 'person_id' })
    person: Person;

    @ManyToOne(() => TipoTarjeta, (tipoTarjeta) => tipoTarjeta.tarjetas)
    @JoinColumn({ name: 'tipoTarjeta_id' })
    tipoTarjeta: TipoTarjeta;

    @ManyToOne(() => TipoCierre, (tipoCierre) => tipoCierre.tarjetas)
    @JoinColumn({ name: 'tipoCierre_id' })
    tipoCierre: TipoCierre;

    @OneToMany(() => TarjetaPago, (tarjetaPago) => tarjetaPago.tarjeta)
    tarjetaPagos: TarjetaPago[];

    @Column()
    anioInicio: number;

    @Column()
    mesInicio: number;

    // @BeforeInsert()
    // checkFieldsBeforeInsert() {
    //     this.nombre = this.nombre.toLowerCase().trim();
    // }

    // @BeforeUpdate()
    // checkFieldsBeforeUpdate() {
    //     this.checkFieldsBeforeInsert();   
    // }
}
