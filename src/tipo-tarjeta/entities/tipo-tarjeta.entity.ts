import { Banco } from "src/banco/entities/banco.entity";
import { ProveedorTarjeta } from "src/proveedor-tarjeta/entities/proveedor-tarjeta.entity";
import { Tarjeta } from "src/tarjeta/entities/tarjeta.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToOne, JoinColumn, BeforeInsert, BeforeUpdate, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";

@Entity('tipo_tarjeta')
export class TipoTarjeta {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 200, nullable: false })
    nombre: string;

    
    @ManyToOne(() => Banco, (banco) => banco.tipoTarjetas)
    @JoinColumn({ name: 'banco_id' })
    banco: Banco;
  
    @ManyToOne(() => ProveedorTarjeta, (proveedorTarjeta) => proveedorTarjeta.tipoTarjetas)
    @JoinColumn({ name: 'proveedorTarjeta_id' })
    proveedorTarjeta: ProveedorTarjeta;

    @Column('varchar', { length: 1000, nullable: true  })
    urlImagen: string;
    

    @OneToMany(() => Tarjeta, (tarjeta) => tarjeta.tipoTarjeta)
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
