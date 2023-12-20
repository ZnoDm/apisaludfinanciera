import { Length } from 'class-validator';
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'
import { Role } from '../../rol/entities/rol.entity';
import { Person } from '../../person/entities/person.entity';

@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 200, unique: true })
    email: string;

    @Column('varchar', { length: 200, select :false })
    password: string;

    @Column('bit', { default: true })
    isActive: boolean;

    @ManyToMany(() => Role, (rol) => rol.users)
    @JoinTable({
        name: 'user_roles',
        synchronize: false,
        joinColumn: {
        name: 'user_id',
        referencedColumnName: 'id',
        },
        inverseJoinColumn: {
        name: 'role_id',
        referencedColumnName: 'id',
        },
    })
    roles: Role[];

    @OneToOne(() => Person, person => person.user)
    @JoinColumn({ name: 'person_id' })
    person: Person;

    @BeforeInsert()
    checkFieldsBeforeInsert() {
        this.email = this.email.toLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate() {
        this.checkFieldsBeforeInsert();   
    }
}
