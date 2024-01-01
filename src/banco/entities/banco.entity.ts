
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToOne, JoinColumn, BeforeInsert, BeforeUpdate, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('banco')
export class Banco {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 200, nullable: false })
    nombre: string;

  
    @BeforeInsert()
    checkFieldsBeforeInsert() {
        this.nombre = this.nombre.toLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate() {
        this.checkFieldsBeforeInsert();   
    }

}
