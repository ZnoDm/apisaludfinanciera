import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToOne, JoinColumn, BeforeInsert, BeforeUpdate, ManyToOne, OneToMany } from "typeorm";
import { Cuenta } from "./cuenta.entity";

@Entity('tipo_cuenta')
export class TipoCuenta {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 200, nullable: false })
    nombre: string;

    @OneToMany(() => Cuenta, (cuenta) => cuenta.tipoCuenta)
    cuentas: Cuenta[];

    @BeforeInsert()
    checkFieldsBeforeInsert() {
        this.nombre = this.nombre.toLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate() {
        this.checkFieldsBeforeInsert();   
    }

}
