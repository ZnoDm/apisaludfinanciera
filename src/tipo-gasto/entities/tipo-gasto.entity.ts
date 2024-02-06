import { CategoriaGasto } from "src/categoria-gasto/entities/categoria-gasto.entity";
import { CuentaGasto } from "src/cuenta/entities/cuenta-gasto.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('tipo_gasto')
export class TipoGasto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 200, nullable: false })
    nombre: string;

    @OneToMany(() => CategoriaGasto, (categoriaGasto) => categoriaGasto.tipoGasto)
    categoriaGastos: CategoriaGasto[];

    @OneToMany(() => CuentaGasto, (cuentaGasto) => cuentaGasto.tipoGasto)
    cuentaGastos: CuentaGasto[];
}
