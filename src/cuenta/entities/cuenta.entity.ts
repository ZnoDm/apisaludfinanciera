import { Role } from "src/rol/entities/rol.entity";
import { Person } from "src/person/entities/person.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToOne, JoinColumn, BeforeInsert, BeforeUpdate, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { TipoCuenta } from "./tipo-cuenta.entity";

@Entity('cuenta')
export class Cuenta {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => TipoCuenta, (tipoCuenta) => tipoCuenta.cuentas)
    @JoinColumn({ name: 'tipoCuenta_id' })
    tipoCuenta: TipoCuenta;

    @ManyToOne(() => Person, (person) => person.cuentas)
    @JoinColumn({ name: 'person_id' })
    person: Person;


    @Column('varchar', { length: 200, nullable: false })
    nombre: string;

    @Column('varchar', { length: 100, nullable: true })
    descripcion: string;

    @Column('decimal')
    presupuesto: number;

    @Column('bit', { default: true })
    isActive: boolean;


    @BeforeInsert()
    checkFieldsBeforeInsert() {
        this.nombre = this.nombre.toLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate() {
        this.checkFieldsBeforeInsert();   
    }
    
    @CreateDateColumn()
    fechaCreacion: Date;

    @UpdateDateColumn()
    fechaModificacion: Date;

}
