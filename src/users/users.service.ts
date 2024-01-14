import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { map } from 'rxjs';
import { plainToClass } from 'class-transformer';
import { UserMapper } from './mapper/user.mapper';
import { UserDto } from './dto/users.dto';

import * as bcrypt from 'bcrypt-nodejs';
import { Role } from 'src/rol/entities/rol.entity';
import { Person } from 'src/person/entities/person.entity';
@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
    private userMapper: UserMapper,
  ){}
 

  async findAll(): Promise<UserDto[]> {
    const users: User[] = await this.userRepository.find({
      relations : ['person']
    });
    return users.map( user => this.userMapper.entityToDTO(user));
  }

  async findOneById(id: number): Promise<User | undefined> {
    const user: User | undefined = await this.userRepository.findOne({where: {id}});
    return user;
  }








   
  async resetPassword(id: number) {
    const user = await this.userRepository.findOne({ 
      where: { id },
      select: { email: true, password: true, id: true}
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    user.password = bcrypt.hashSync('123456');
    await this.userRepository.save( user )

    return{
      ok:true,
      message:  "Contraseña actualizada con éxito."
    }
  }
  
  async enabledDisabledUser(id: number): Promise<any> {
    const user = await this.userRepository.findOne({ where :{id}});

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    user.isActive = !user.isActive;
    await this.userRepository.save(user);
    return {
      ok : true,
      user
    };
  }

  async getAllRolesForUser(id: number): Promise<any> {
    const user = await this.userRepository.findOne({ where: {id}, relations: ['roles'] });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const allRoles = await this.roleRepository.find();

    const roles = allRoles.map((rol) => {
      const isActive = user.roles.some((r) => r.id === rol.id);
      return {
        ...rol,
        active: isActive,
      };
    });
    return roles;
  }

  async toggleRoleForUser(userId: number, roleId: number, isActive: boolean): Promise<any> {

    const user = await this.userRepository.findOne({ where: { id : userId },  relations: ['roles'] });
    const role = await this.roleRepository.findOne( { where : { id: roleId} });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    if (!role) {
      throw new NotFoundException(`Role with ID ${roleId} not found`);
    }

  
    const existingRolIndex = user.roles.findIndex((p) => p.id == roleId);
    if (isActive && existingRolIndex === -1) {
      user.roles.push(role);
    } else if (!isActive && existingRolIndex !== -1) {
      // console.log(isActive )
      // console.log( existingRolIndex)
      user.roles.splice(existingRolIndex, 1);
    }

    await this.userRepository.save(user);
    return {
      ok: true,
      message: "Rol actualizado con éxito",
      user
    }
  }

  async create(createUserDto: CreateUserDto) {
    const RolUser = await this.roleRepository.findOne({ where: { id:createUserDto.idRol}});
    if (!RolUser) {
      throw new BadRequestException('No se encontró el rol user para asignar');
    }
    const PersonUser = await this.personRepository.findOne({ where: { id:createUserDto.idPerson}});
    if (!PersonUser) {
      throw new BadRequestException('No se encontró la persona para asignar');
    }

    const user = this.userRepository.create({
      email: createUserDto.email,
      password: bcrypt.hashSync(createUserDto.password),
      person: PersonUser,
      roles: [ RolUser ]
    });
    await this.userRepository.save( user );

    return {
      ok: true,
      message : `Creado con éxito`,
      user: user
    };
  }
async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where : {id}});
    
    if (!user) {
        throw new NotFoundException('Usuario no encontrado');
    }
    
    if (updateUserDto.email) {
        user.email = updateUserDto.email;
    }
    
    if (updateUserDto.password) {
        user.password = bcrypt.hashSync(updateUserDto.password);
    }

    if (updateUserDto.idPerson) {
        const PersonUser = await this.personRepository.findOne({ where: { id: updateUserDto.idPerson } });
        if (!PersonUser) {
            throw new BadRequestException('No se encontró la persona para asignar');
        }
        user.person = PersonUser;
    }
    
    await this.userRepository.save(user);
    
    return {
        ok: true,
        message: 'Usuario actualizado con éxito',
        user: user,
    };
}

}
