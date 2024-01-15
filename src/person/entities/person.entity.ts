import { Length } from 'class-validator';
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'
import { User } from '../../users/entities/user.entity';
import { Tarjeta } from 'src/tarjeta/entities/tarjeta.entity';
// import { Cuenta } from 'src/cuenta/entities/cuenta.entity';

@Entity('person') // Nombre de la tabla persona
export class Person {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 100, nullable: true })
    nombres: string;

    @Column('varchar', { length: 100, nullable: true  })
    apellidos: string;
        
    @Column('varchar', { length: 20, nullable: true  })
    telefono: string;

    @Column('varchar', { length: 4, nullable: true  })
    tipoDocumentoIdentidad: string;

    @Column('varchar', { length: 20, nullable: true  })
    documentoIdentidad: string;

    @Column('varchar', { length: 1000, nullable: true  })
    urlAvatar: string;

    // Relación One-to-One con la entidad User
    @OneToOne(() => User, user => user.person)
    user: User;

    @OneToMany(() => Tarjeta, (tarjeta) => tarjeta.person)
    tarjetas: Tarjeta[];

    // @OneToMany(() => Cuenta, (cuenta) => cuenta.person)
    // cuentas: Cuenta[];

}